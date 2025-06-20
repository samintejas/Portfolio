# Mathematical induction

Mathematical induction is a powerful proof technique used to establish the truth of statements about integers or other mathematical objects that are defined recursively. It's commonly used to prove statements about natural numbers, but it can also be applied to other structures like sets, graphs, or trees.

> a nice video on this topic : [Principle of Mathematical Induction](https://youtube.com/playlist?list=PLO1y6V1SXjjM2Cnx7JPYSbrvyIf9PT3zL&si=_ScFoP4y5DP2C3IH)

The principle of mathematical induction consists of two main steps:

1. **Base Case**: Prove that the statement holds for the smallest value in the set of integers (usually 0 or 1, depending on the context). This step establishes the base or initial case for the induction.
2. **Inductive Step**: Prove that if the statement holds for a particular integer $k$, then it also holds for the next integer $k+1$. This step establishes the induction or recursive case.

---

**Example**: Prove that the sum of the first $n$ positive integers is given by the formula $1+2+3+...+n = \frac{{n(n+1)}}{2}$

**Sol** :
Base Case → For $n=1$, the sum $1 = \frac{1(1+1)}{2}$, which is true.
Inductive Case →
case for k ,

$$
1 + 2 + 3 + ... + k = \frac{k(k+1)}{2}
$$

Adding $k+1$ on both sides will give us the $k+1$ case ,



$$
1+2+3+..+k+(k+1) = \frac{k(k+1)}{2} + (k+1)
$$

$$
1+2+3+..+k+(k+1) = \frac{k(k+1) + 2(k+1)}{2}
$$

$$
1+2+3+..+k+(k+1) = \frac{(k+1)(k+2)}{2}
$$

Now if we directly plug k+1 into the given problem statement,

$$
1+2+3+..+k+(k+1) = \frac{(k+1)(k+2)}{2}
$$

Hence the derived $k+1$  and direct $k+1$  case is matching , hence proved

---

## Strong Induction

in string induction , the base case remains same , but while proving the inductive hypothesis we use a different formula

that is , if $P(1) \land P(2) \land .... \land P(k)$ is true then $P(k+1)$ is true
