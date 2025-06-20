## proof methodology

a proof is a valid argument to establish the truth of a mathematical statement.
it can use
- the hypotheses of the theorem
- axioms or defenitions assumed to be true
- previously proven theorms
and should follow rule of inference

a proof is said to be valid if the trut of the statement is being proved

Terminology
- theorem - a mathamatical statement that can be shown to be true
- propositon and lemmas - minor theorems used as intermediaries to prove large theorems
- corollary - a theorem that can be established directly from a proven theorem
- conjecture - a statement that is being proposed to be a true statement , usually on the basis of some partial evidence

### Direct Proof example

we seek to solve a $p \implies q$ problem using direct proof technique

**Q** : prove theorem , if $n$ is an odd integer , prove $n^2$ is also and odd integer
**Sol** :

This is a $p \implies q$ problem ,
Suppose $n$ is an odd integer , means by defenition $ n = 2k+1$ for some integer k
so ,
$$
\displaylines{
n^2 = (2k +1)^2 \\ n^2 = 4k^2 + 4k +1 \\ n^2 = 2(2k^2+2k)+1}
$$

since k is an integer, $2k^2+2k =l$ is also an integer
so,
$$
n^2 = 2l+1
$$
that is $n^2$ is an odd integer

### Indirect proof example (proof by contrapositon)


we seek to solve a $p \implies q$ problem using indirect proof technique, but unlike direct proof we will use the propert,
$$
(p \implies q) \equiv (\neg p \implies \neg q)
$$

**Q** : prove theorem , if $3n+2$ is odd , where $n$ is an integer , then $n$ is odd
**Sol** :
Proof by contrapositon
the contrapositive of the theorem statement is , if $3n+2$ is not odd ,
$n$ is an integer , then $n$ is not odd
ie, if $n$ is an even integer then $3n+2$ is even
ie,
$$
n=2k
$$
for some integer k
now ,
$$
\displaylines{
3n + 2 = 3(2k) + 2 \\
3n+2 = 6k+2 \\
3n+2 = 2(3k + 1)}
$$
since $k$ is an integer , $3k+1 =l$ is also an intefer
ie,
$$
3n+2 = 2l
$$
thus by defenition of even number the theorem is proved

### Proof by contradiction

contradiction - it is a proposition that is always false

here we seek to solve the problem of kind $p$ by using $\neg p \implies F$

#### Example
**Q** : prove the theorem, $\sqrt{2}$ is irrational
**Sol** :
By way of contradiction ,suppose $\sqrt{2}$ is rational,
by defenition of rational number , $\sqrt{2} = {\frac{p}{q}}$ where $p$ and $q$ are integers and $q \neq 0$

Further suppose $p,q$ has no common factors,
in particular , $p,q$ are not both even numbers
squaring,
$$
\displaylines{
2 = (\frac{p}{q})^2 \\
p^2 = 2q^2
}
$$

because $p$ are integers and , $p^2$ are even , $p$ is even
that is , $p=2k$ where $k$ is an integer
that is , $4k^2 = 2q^2$
that is , $q^2 = 2k^2$

so by defenition, $q$ is even
we assumed that both $p,q$ are not even , therefor we have a contradiction,
so we can conclude the initial statement to be true
