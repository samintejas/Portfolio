# Discrete Mathematics - Assignment 1
> *Submitted By* :
>
> *Samin Tejas* , BCs cohort 4
>
> email : 2024eb01133@online.bits-pilani.ac.in
## Question 1
Determine whether $\forall (p(x) \implies Q(x))$
and
$\forall x P(x) \implies \forall x Q(x) $ are logically equivalent. Justify your answer.

### Solution

This question asks to verify the equivalence of two statements,
statement 1 says, for all x , if p(x) is true, then q(x) must also be true
statement 2 says if p(x) is true for all x then q(x) also must be true for all x

ie.

$\forall (p(x) \implies Q(x))$
and
$\forall x P(x) \implies \forall x Q(x) $




These 2 statements can be proved non equivalent by providing atleast one counterexample

#### Proof by counterexample
let,
$p(x)$ be the predicate "$x$ is an even integer"
$q(x)$ be the predicate "$x$ is divisible by 4,without any fraction"

for the statement 1 the counter example need to be checked for only cases where $p(x)$ is true since the statement is automatically true for $p(x)$ being false,
lets consider the value of $x$ as 2 , in this case $p(x)$ will be true since it is even but $q(x)$ will be false since it cannot be divided by 4.
for statement 2 ,Since $\forall x P(x)$ (i.e., all integers are even) is false, the implication is true by the rules of logic.

*this conter example that proves the statements as non-eqivalent*

## Question 2

Using mathematical induction prove the following, for every positive integer n, $3^n + 7^n - 2 $ is divisible by 8

### Solution

Honoring the standard steps of mathematical induction we will start by defining a *base case*,

ie , for $n=1$, the statement becomes
$$
3^1 + 7^1 - 2 = 8
$$
which is divisible by 8

assuming the statement is true for some positive integer k, (inductive hypothesis)
ie.
$3^k + 7^k -2$ is divisible by 8
ie.
$$
3^k + 7^k -2 = 8m
$$
where m is an integer

now we need to prove that the statement holds for the $k+1$ (inductive step)
ie.
$$
3^{k+1} + 7^{k+1} - 2
$$
rewriting,
$$
3.3^{k} + 7.7{k} - 2
$$

adding and substracting 8m,

$$
3.3^{k} + 7.7{k} - 2 + 8m - 8m
$$

expanding,

$$
3.3^{k} + 7.7{k} - 2 + (-3^k - 7^k -2) + 8m
$$

rearranging,

$$
2(3^k + 3.7^k) + 8m - 4
$$

the inner term will be always even and the it will be divisible by 4, so we can rewrite the equation as
$$
4(q + 2m) = 8((q+2m)/2)
$$
which is divisible by 8 , hence proved

## Question 3
Let $A$ , $B$ and $C$ be sets. use the identity $A - B = A \cup \overline{B}$ , which holds for any sets $A$ and $B$ and the identities to show that $(A-B) \cap (B-C) \cap (A-C) = \emptyset$

### Solution

Rewriting the terms as by using the provided identity,

$$
A-B = A \cap \overline{B}
$$

$$
B-C = B \cap \overline{C}
$$

$$
A-C = A \cap \overline{C}
$$

substituting in given statement,
$$
(A \cap \overline{B}) \cap (B \cap \overline{C}) \cap (A \cap \overline{C})
$$

in this , for the first two terms , there wont be any common element so it will always evaluate to a null set , so in effect the whole statement will be evaluated to a null set.
ie.

$$
(A \cap \overline{B}) \cap (B \cap \overline{C}) = \emptyset
$$

ie.
$$
\emptyset \cap (A \cap \overline{C}) = \emptyset
$$

hence the given statement evaluates to an empty set.

## Question 4

consider the relation represented by the matrix
$$
\begin{bmatrix}
{1} & {0} & {1} & {0} \\
{0} & {0} & {0} & {0} \\
{1} & {0} & {1} & {0} \\
{0} & {0} & {0} & {1}
\end{bmatrix}
$$
find whether the relation is symmetric , antisymmetric and transitive

### Solution

After observing the given matrix , for relation R and for all $i$ and $j$, $(i,j) \in R$ and $(j,i) \in R$ , so the given matrix *is symmetric*.

while doing so we can observe that the element $(1,3)$ and $(3,1)$ are not same , hence the relation *is not antisymmetric*.

for a relation to be transitive , for all $i,j,k$ if $(i,j) \in R$ and $(j,k) \in R$ and $(i,k) \in R $. given matrix satisfies this condition hence it *is transitive*.

## Question 5
Let $a$ and $b$  be real numbers with $a<b$. Use the floor and/or ceiling functions to express the number of integers $n$ that satisfy the inequality $a≤n≤b$

### Solution

The ceil function gives the smallest value and floor function represents the largest value with respect to a variable.

so we can rewrite the statement as
$$
\lceil b \rceil - \lfloor a \rfloor + 1
$$

here the 1 is added to account for the endpoints.
