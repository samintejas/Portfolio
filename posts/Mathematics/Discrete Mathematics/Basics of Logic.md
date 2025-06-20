# Basics of logic

> references :
> - Book: Kenneth H. Rosen. 2021. *Discrete Mathematics and Its Applications*. 8th Edition. McGraw Hill: McGraw Hill Education (India) Private Limited.
> - [brilliant.org/wiki/propositional-logic](https://brilliant.org/wiki/propositional-logic/)

## Proposition

The rules of logic allow us to distinguish between valid and invalid arguments.In mathematics, we are interested in statements that can be proved or disproved. We define a proposition (sometimes called a statement, or an assertion) to be a sentence that is either true or false, but not both.

> lets take two arguments:
> 1. The rules of logic allow us to distinguish between valid and invalid arguments.
> 2. If I watch Monday night football, then I will miss the following Tuesday 8 a.m. class. Therefore, if I do not miss my Tuesday 8 a.m. class, then I did not watch football the previous Monday night.
>
> both are of the form If $p$ then $q$. Therefore if $q$ is false then $p$ is false.

In mathematics, we are interested in statements that can be proved or disproved. We define a **proposition** (sometimes called a statement, or an assertion) to be a sentence that is either true or false, but not both. true is demotes by $T$ , false is denoted by $F$ and proposition variables are denoted by $p,q,r...$ or $p_1,p_2,p_3...$
- Compound propositions are new propositions created from excising proposition using logical operators or connectives.

### Connectives

Relationship between propositions are represented using **connectives**

*Different connectives* :

| **Connectives**    | **Symbol**            | **Description**         |
|--------------------|-----------------------|-------------------------|
| Negation           | $\neg$                | NOT                     |
| Conjunction        | $\land$               | AND                     |
| Disjunction        | $\lor$                | OR                      |
| Conditional        | $\implies$            | if .. then              |
| Biconditional      | $\leftrightarrow$     | if and only if          |
| Converse           | $B \implies A$        | reverse implication     |
| Contrapositive     | $\neg B \implies \neg A$ | negated converse     |

- Negation of proposition is denoted by $\neg p$, the truth value of the negation of $p$ is the opposite of truth value of $p$.
- conjunction - lets take 2 proposition say $p$ and $q$ , the conjunction ($\land$) $p \land q$ is *“p and q”* as in logical **and**. it is true if both p and q are true
- Disjunction ($\lor$) - it is like a logical **or**, it is false when both p and q are false otherwise true.
- implication or conditional statement, $p \implies q$  (p implies q or p conditional q) is the proposition *“if p, then q” . $p \implies q$* is false when $p$ is true and $q$ is false. here p is called hypothesis and q is called conclusion.

  | **$p$** | **$q$** | **$p \implies q$**  |
  | ------- | ------- | ------------------- |
  | $T$     | $T$     | $T$                 |
  | $F$     | $T$     | $T$                 |
  | $T$     | $F$     | $F$                 |
  | $F$     | $F$     | $T$                 |

  > Imagine a promise scenario involving a parent and a child. The parent makes a promise: "If you finish your homework, then you can watch TV."
  The promise is broken only if the child finishes their homework ($p$ is true) but is not allowed to watch TV ($q$ is false).
- converse , $q \implies p$ is the converse of $p \implies q$

  | **$p$** | **$q$** | **$q \implies p$**  |
  | ------- | ------- | ------------------- |
  | $T$     | $T$     | $T$                 |
  | $F$     | $T$     | $F$                 |
  | $T$     | $F$     | $T$                 |
  | $F$     | $F$     | $T$                 |

  > The original proposition is: "If you finish your homework, then you can watch  TV." The converse of this proposition would be: "If you can watch TV, then you have finished your homework."
- contrapositive , $\neg q \implies \neg p$ is the contrapositive of $p \implies q$
  > The original proposition is: "If you finish your homework , then you can watch TV ." Contrapositive: "If you cannot watch TV (¬Q), then you have not finished your homework (¬P)."

> Example for implication,converse and contrapositive
  Statement: "If it is raining, then the ground is wet."
> In propositional logic:
>
>  $p$ : It is raining.
>  $q$ : The ground is wet.
> 1. Implication: $p$ → $q$: "If it is raining ($p$), then the ground is wet ($q$)
> 2. Converse: $q$ → $p$: "If the ground is wet ($q$), then it is raining ($p$)."
> 3. Contrapositive:  $\neg q \implies \neg p$: "If the ground is not wet ($\neg q$), then it is not raining ($\neg p$)."


| It is Raining ($p$) | The Ground is Wet ($q$) | Original ($p \implies q$) | Converse ($q \implies p$) | Contrapositive ($\neg q \implies \neg p$) |
|---------------------|-------------------------|---------------------------|--------------------------|-------------------------------------------|
| True                | True                    | True                      | True                     | True                                      |
| True                | False                   | False                     | True                     | False                                     |
| False               | True                    | True                      | False                    | True                                      |
| False               | False                   | True                      | True                     | True                                      |

## Logical equivalences

a compount proposition that is always true, ie. true for every combination of truth values of its propositional variables is called **tautology**.

for example take $p \lor \neg p$ , this will always evaluate to true , so it is a tautology .

the opposit of tatutolody , ie always false is called contradiction
for example , $p \land \neg p$ will always evaluate to false , which is a contradiction

compount proposition $p$ and $q$ are called **logicaly equivalent** if their truth table are the same.it is denoted by $ p \equiv q $
example : $ p \implies q $ and $ \neg p \implies \neg q $


### Properties

1. **Conditional Statement and Contrapositive:**
   $$
   p \rightarrow q \equiv \neg q \rightarrow \neg p
   $$
   This means that a conditional statement is logically equivalent to its contrapositive.

2. **Disjunction of Conditionals:**
   $$
   (p \rightarrow q) \lor (p \rightarrow r) \equiv p \rightarrow (q \lor r)
   $$
   This expresses that the disjunction of two conditionals is logically equivalent to a conditional with a disjunction in its consequent.

3. **Disjunction and Conjunction:**
   $$
   (p \rightarrow r) \lor (q \rightarrow r) \equiv (p \land q) \rightarrow r
   $$
   This shows that the disjunction of two conditionals is logically equivalent to a conditional where the antecedent is the conjunction of the original antecedents.


#### De Morgan's Laws

1. **First Law:**
   $$
   \neg(p \land q) \equiv \neg p \lor \neg q
   $$
   The negation of a conjunction (AND) of two propositions is logically equivalent to the disjunction (OR) of their negations.

2. **Second Law:**
   $$
   \neg(p \lor q) \equiv \neg p \land \neg q
   $$
   The negation of a disjunction (OR) of two propositions is logically equivalent to the conjunction (AND) of their negations.

3. **Implication in Terms of Disjunction:**
   $$
   p \implies q \equiv \neg p \lor q
   $$
   An implication \( p \implies q \) can be expressed as a disjunction (OR) where the antecedent is negated.

#### Distributivity

1. **Distributivity of OR over AND:**
   $$
   p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)
   $$
   This law states that the disjunction (OR) of a proposition $p$ with the conjunction (AND) of $q$ and $r$ is equivalent to the conjunction (AND) of $p$ with $q$ and $p$ with $r$. Essentially, "OR" distributes over "AND."

2. **Distributivity of AND over OR:**
   $$
   p \land (q \lor r) \equiv (p \land q) \lor (p \land r)
   $$
   This law states that the conjunction (AND) of a proposition $p$ with the disjunction (OR) of $q$ and $r$ is equivalent to the disjunction (OR) of $p$ with $q$ and $p$ with $r$. Essentially, "AND" distributes over "OR."

#### Associativity

1. **Associativity of OR:**
   $$
   p \lor (q \lor r) \equiv (p \lor q) \lor r
   $$
   This law indicates that the grouping of propositions in a disjunction (OR) does not affect the result. Whether you group $p \lor q$ first and then OR with $r$, or OR $q$ and $r$ first and then OR with $p$, the result is the same.

2. **Associativity of AND:**
   $$
   p \land (q \land r) \equiv (p \land q) \land r
   $$
   This law indicates that the grouping of propositions in a conjunction (AND) does not affect the result. Whether you group $p \land q$ first and then AND with $r$, or AND $q$ and $r$ first and then AND with $p$, the result is the same.

> #### how to state two compount propositons are not logically equaivalent ?
>  find any one row in the truth table where one evaluates to true and other evaluates to false --> this consitions are called a counterexample

## Predicates

A predicate (or proposition function) is a statement or expression that contains one or more variables and becomes a proposition when specific values are substituted for these variables. A predicate is not itself a proposition until the variables are given specific values, at which point it can be evaluated as true or false.

the definition of the predicate is : *A statement of the form P(x1,x2,...xn) is the value of the propositional function P at the n-tuple
(x1,x2,...xn), and P is called an n-place predicate or an n-ary predicate.*

> Example : consider the predicate $P(x): [5x = 15]$
>
> $P(1)$ is $F$ and $P(3)$ is $T$

#### Domain

A domain or the universe of discourse is the set from which the n-tuple in the predicates takes their values

> Example : In the $P(x): [ x − 4 > 0 ]$, the domain of $x$ can be the set of integers $\mathbb{Z}$. Alternatively, the domain of $x$ could also be the set of real numbers $\mathbb{R}$.

### Universal quantifier

The universal quantification of $P(x)$ is the statement: *“P(x) is true for all values of x in the domain.”* denoted by $\forall xP(x)$. Here, $\forall$ is called the universal quantifier.

*“$\forall xP(x)$”* is $T$ if $P(x)$ is true for every element in the domain and $F$ if $P(x)$ is false for at least one element in the domain

An element for which $P(x)$ is false is called a counterexample of $\forall xP(x)$.

### Existential Quantifiers
The existential quantification of $P(x)$ is the proposition: *“There exists an element $x$ in the domain such that $P(x)$ is true.”* denoted by $\exists xP(x)$. Here, $\exists$ is called the existential quantifier.

*“$\exists xP(x)$”* is $T$ if $P(x)$ is true for at least one element in the domain, and $F$ if $P(x)$ is $F$ for all the elements in the domain

### Logical Equivalence involving predicate and quantifiers

Statements involving predicates and quantifiers are logically equivalent if and only if they have the same truth value, no matter which predicates are substituted into these statements and which domain of discourse is used for the variables in these propositional functions.

We use the notation $S \equiv T$ to indicate that two statements, $S$ and $T$, involving predicates and quantifiers,are logically equivalent.

## Negating quantified predicates

### Demorgan's law for quantifiers

below are 2 demorgan's law for quantifiers

#### Negating universal quantifier

$\neg (\forall x P(x))$ is the same as $\neg (P(x_1) \land P(x_2) .... \land P(x_n))$ which is equivalent to $(\neg P(x_1) \lor \neg P(x_2) .... \lor \neg P(x_n))$

OR

for domain $D$
$$
\neg (\forall x \in D , P(x)) \equiv (\exists x \in D, \neg P(x))
$$

> Example
> Domain: Set of integers ($Z$)
>
> Let $P(x): x < 10$
> this means $\forall x \in \mathbb{Z} P(x): x < 10$ this statement describes that *"all integers have a value strictly less than 10"*. The negation of the statement would be $\neg (\forall x \in \mathbb{Z} P(x): x < 10)$ *“Not all integers have a value less than 10.”*
>
> This means there are some integers (at least one integer) with a value greater than or equal to 10.
> $\exists x \in \mathbb{Z} : (x >= 10)$  There exist some integers having a value greater than or equal to 10.

#### Negating existential quantifier

$\neg ( \exists x P(x))$ is the same as $\neg (P(x_1) \lor P(x_2) .... \lor P(x_n))$ which is equivalent to $(\neg P(x_1) \land \neg P(x_2) .... \land \neg P(x_n))$

OR

for domain $D$
$$
\neg (\exists x \in D , P(x)) \equiv (\forall x \in D, \neg P(x))
$$

## Nested quantifiers
### Negation of nested quantifiers

## Rules of inference
