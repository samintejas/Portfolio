# random number

## Algorithm

### Linear Congruential Generators (LCG)

This is one of the simplest and most widely used algorithms. It produces the next random number using the formula:
$$
X_{n+1} = (aX_n+c) \mod  m
$$

> Where:  
>  $X$ is the sequence of pseudo-random values,  
>  $a$ is the multiplier,  
>  $c$ is the increment,  
>  $m$ is the modulus (the range of the random number).  

### Mersenne Twister
This is a more complex and widely-used algorithm that produces high-quality pseudo-random numbers. It has a very long period and good statistical properties.
