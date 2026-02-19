---
title: Math, Algorithms, and Code
date: 2026-02-17
---

A collection of interesting mathematical concepts and their implementations. Nothing fancy — just things I find elegant.

## The Sieve of Eratosthenes

One of the oldest algorithms still in use. Given an upper bound `n`, it finds all prime numbers up to `n` by iteratively marking composites.

Time complexity: O(n log log n). Space: O(n).

```rust
fn sieve(n: usize) -> Vec<bool> {
    let mut is_prime = vec![true; n + 1];
    is_prime[0] = false;
    is_prime[1] = false;
    let mut i = 2;
    while i * i <= n {
        if is_prime[i] {
            let mut j = i * i;
            while j <= n {
                is_prime[j] = false;
                j += i;
            }
        }
        i += 1;
    }
    is_prime
}
```

The key insight: you only need to sieve up to √n. Every composite number ≤ n has a prime factor ≤ √n. For n = 1,000,000 that means only checking up to 1,000.

## Fast Exponentiation

Computing x^n naively takes n multiplications. Binary exponentiation does it in O(log n) by exploiting:

- If n is even: x^n = (x^(n/2))^2
- If n is odd: x^n = x · x^(n-1)

```rust
fn power(mut base: u64, mut exp: u64, modulus: u64) -> u64 {
    let mut result = 1u64;
    base %= modulus;
    while exp > 0 {
        if exp % 2 == 1 {
            result = result * base % modulus;
        }
        exp /= 2;
        base = base * base % modulus;
    }
    result
}
```

This is the backbone of RSA encryption. Computing `m^e mod n` where e can be 65537 or larger — impossible without this trick.

## The Birthday Paradox

In a room of just 23 people, there's a >50% chance two share a birthday. The probability that all birthdays are distinct:

P(no collision) = 365/365 × 364/365 × 363/365 × ... × 343/365

```python
def birthday_probability(n):
    p = 1.0
    for i in range(n):
        p *= (365 - i) / 365
    return 1 - p

# birthday_probability(23) ≈ 0.5073
# birthday_probability(50) ≈ 0.9704
# birthday_probability(70) ≈ 0.9992
```

This matters in cryptography. A hash function with 128-bit output doesn't need 2^128 attempts to find a collision — only about 2^64 (the square root). This is why SHA-256 provides 128-bit collision resistance, not 256-bit.

## Fibonacci via Matrix Exponentiation

The naive recursive Fibonacci is O(2^n). Dynamic programming gets it to O(n). But matrix exponentiation computes F(n) in O(log n):

| F(n+1)  F(n)   |     | 1  1 |^n
| F(n)    F(n-1) |  =  | 1  0 |

```rust
type Matrix = [[u64; 2]; 2];

fn multiply(a: &Matrix, b: &Matrix, m: u64) -> Matrix {
    let mut c = [[0u64; 2]; 2];
    for i in 0..2 {
        for j in 0..2 {
            for k in 0..2 {
                c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % m;
            }
        }
    }
    c
}

fn matrix_power(mut base: Matrix, mut n: u64, m: u64) -> Matrix {
    let mut result: Matrix = [[1, 0], [0, 1]]; // identity
    while n > 0 {
        if n % 2 == 1 {
            result = multiply(&result, &base, m);
        }
        base = multiply(&base, &base, m);
        n /= 2;
    }
    result
}

fn fibonacci(n: u64, m: u64) -> u64 {
    if n == 0 { return 0; }
    let base: Matrix = [[1, 1], [1, 0]];
    let result = matrix_power(base, n, m);
    result[0][1]
}
```

Computing F(10^18) mod 10^9+7? No problem. Try that with a loop.

## Euclidean Algorithm

The GCD algorithm is ancient (circa 300 BC) and still one of the most useful:

```rust
fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b != 0 {
        let t = b;
        b = a % b;
        a = t;
    }
    a
}
```

The extended version finds x, y such that ax + by = gcd(a, b):

```rust
fn extended_gcd(a: i64, b: i64) -> (i64, i64, i64) {
    if b == 0 {
        return (a, 1, 0);
    }
    let (g, x1, y1) = extended_gcd(b, a % b);
    (g, y1, x1 - (a / b) * y1)
}
```

This gives you modular inverses for free. If gcd(a, m) = 1, then the x from `ax + my = 1` is the modular inverse of a mod m. Essential for division in modular arithmetic.

## Reservoir Sampling

Select k items uniformly at random from a stream of unknown length. You see each element once and can't go back.

```python
import random

def reservoir_sample(stream, k):
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir
```

The proof is elegant: at step i (0-indexed), each of the first i+1 elements has probability k/(i+1) of being in the reservoir. By induction, when the stream ends at length n, each element has probability k/n of being selected. Uniform.

## Euler's Totient Function

φ(n) counts integers from 1 to n that are coprime to n. For prime p: φ(p) = p - 1. For prime powers: φ(p^k) = p^k - p^(k-1). The function is multiplicative: φ(ab) = φ(a)φ(b) when gcd(a,b) = 1.

```rust
fn euler_totient(mut n: u64) -> u64 {
    let mut result = n;
    let mut p = 2;
    while p * p <= n {
        if n % p == 0 {
            while n % p == 0 {
                n /= p;
            }
            result -= result / p;
        }
        p += 1;
    }
    if n > 1 {
        result -= result / n;
    }
    result
}
```

Euler's theorem: a^φ(n) ≡ 1 (mod n) when gcd(a, n) = 1. Fermat's little theorem is the special case where n is prime. This is why RSA works — decryption undoes encryption because e·d ≡ 1 (mod φ(n)).

---

Most of competitive programming boils down to recognizing which of these building blocks to reach for. The math hasn't changed in centuries. The implementations fit in a few lines. Elegance is compression.
