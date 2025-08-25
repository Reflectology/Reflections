/**
 * @file almost.c
 * @brief Minimalist complex number implementation with configurable precision.
 *
 * This file provides a basic implementation of complex number operations
 * and mathematical functions with configurable precision. It includes
 * Taylor series approximations for trigonometric, exponential, and
 * square root functions, as well as operations on complex numbers.
 *
 * ## Configuration
 * - `terms`: Number of terms used in Taylor series approximations.
 * - `threshold`: Error threshold for iterative calculations.
 * - `pi`: Value of π with configurable precision.
 *
 * ## Functions
 * ### Setup
 * - `void setup(int terms, double threshold, double pi_value)`
 *   Configures the precision settings for mathematical calculations.
 *
 * ### Core Math Functions
 * - `static double abs_val(double x)`
 *   Computes the absolute value of a number.
 * - `static double sqrt_val(double x)`
 *   Computes the square root of a number using an iterative method.
 * - `static double sin_val(double x)`
 *   Approximates the sine of a number using a Taylor series.
 * - `static double cos_val(double x)`
 *   Approximates the cosine of a number using the sine function.
 * - `static double atan_val(double x)`
 *   Approximates the arctangent of a number using a Taylor series.
 * - `static double atan2_val(double y, double x)`
 *   Computes the angle of a vector (y, x) in radians.
 * - `static double exp_val(double x)`
 *   Approximates the exponential function using a Taylor series.
 *
 * ### Complex Number Operations
 * - `complex_t complex_new(double re, double im)`
 *   Creates a new complex number.
 * - `complex_t complex_add(complex_t a, complex_t b)`
 *   Adds two complex numbers.
 * - `complex_t complex_sub(complex_t a, complex_t b)`
 *   Subtracts two complex numbers.
 * - `complex_t complex_mul(complex_t a, complex_t b)`
 *   Multiplies two complex numbers.
 * - `complex_t complex_div(complex_t a, complex_t b)`
 *   Divides two complex numbers.
 * - `double complex_abs(complex_t z)`
 *   Computes the magnitude of a complex number.
 * - `double complex_arg(complex_t z)`
 *   Computes the argument (angle) of a complex number.
 * - `complex_t complex_conj(complex_t z)`
 *   Computes the conjugate of a complex number.
 * - `complex_t complex_exp(complex_t z)`
 *   Computes the exponential of a complex number.
 * - `void complex_print(complex_t z)`
 *   Prints a complex number in the format "a + bi" or "a - bi".
 *
 * ## Example Usage
 * The `main` function demonstrates the usage of the complex number
 * operations and mathematical functions. It configures precision settings,
 * creates complex numbers, and performs various operations such as addition,
 * subtraction, multiplication, division, magnitude, argument, conjugate,
 * and exponential.
 */
#include <stdio.h>

// Minimalist complex number implementation with configurable precision
typedef struct {
    double re;
    double im;
} complex_t;

// Configuration
static struct {
    int terms;           // Taylor series terms
    double threshold;    // Error threshold
    double pi;           // Pi value (configurable precision)
} config = {
    .terms = 10,         // Default: 10 terms
    .threshold = 1e-10,  // Default: 10^-10 error threshold
    .pi = 3.14159265358979323846
};

// Setup function
void setup(int terms, double threshold, double pi_value) {
    if (terms > 0) config.terms = terms;
    if (threshold > 0) config.threshold = threshold;
    if (pi_value > 0) config.pi = pi_value;
}

// Core math functions (minimalist implementations)
static double abs_val(double x) { return x < 0 ? -x : x; }

static double sqrt_val(double x) {
    if (x <= 0) return 0;
    double guess = x / 2.0, prev;
    do {
        prev = guess;
        guess = (guess + x / guess) / 2.0;
    } while (abs_val(guess - prev) > config.threshold);
    return guess;
}

static double sin_val(double x) {
    // Normalize
    double two_pi = 2.0 * config.pi;
    while (x > config.pi) x -= two_pi;
    while (x < -config.pi) x += two_pi;
    
    // Taylor series
    double result = 0, term = x, x2 = x*x;
    int sign = 1;
    
    for (int i = 0; i < config.terms; i++) {
        result += sign * term;
        sign = -sign;
        term *= x2 / ((2*i + 2) * (2*i + 3));
    }
    return result;
}

static double cos_val(double x) {
    // Normalized cosine using sin(x+π/2)
    return sin_val(x + config.pi/2);
}

// Forward declaration for atan_val
static double atan_val(double x);

static double atan2_val(double y, double x) {
    // Quick implementation for arg calculation
    if (x == 0) return y > 0 ? config.pi/2 : y < 0 ? -config.pi/2 : 0;
    if (x > 0) return atan_val(y/x);
    return y >= 0 ? atan_val(y/x) + config.pi : atan_val(y/x) - config.pi;
}

static double atan_val(double x) {
    // Simple approximation
    if (abs_val(x) < 1.0) {
        double result = 0, x2 = x*x, term = x;
        int sign = 1;
        
        for (int i = 0; i < config.terms; i++) {
            result += sign * term / (2*i + 1);
            sign = -sign;
            term *= x2;
        }
        return result;
    }
    return x > 0 ? config.pi/2 - atan_val(1/x) : -config.pi/2 - atan_val(1/x);
}

static double exp_val(double x) {
    if (x > 700) return 1e308;
    if (x < -700) return 0;
    
    double result = 1, term = 1;
    for (int i = 1; i <= config.terms; i++) {
        term *= x / i;
        result += term;
    }
    return result;
}

// Complex number operations
complex_t complex_new(double re, double im) {
    complex_t z = {re, im};
    return z;
}

complex_t complex_add(complex_t a, complex_t b) {
    return complex_new(a.re + b.re, a.im + b.im);
}

complex_t complex_sub(complex_t a, complex_t b) {
    return complex_new(a.re - b.re, a.im - b.im);
}

complex_t complex_mul(complex_t a, complex_t b) {
    return complex_new(
        a.re * b.re - a.im * b.im,
        a.re * b.im + a.im * b.re
    );
}

complex_t complex_div(complex_t a, complex_t b) {
    double denom = b.re * b.re + b.im * b.im;
    if (denom == 0) return complex_new(1e308, 1e308);  // Infinity approximation
    return complex_new(
        (a.re * b.re + a.im * b.im) / denom,
        (a.im * b.re - a.re * b.im) / denom
    );
}

double complex_abs(complex_t z) {
    return sqrt_val(z.re * z.re + z.im * z.im);
}

double complex_arg(complex_t z) {
    return atan2_val(z.im, z.re);
}

complex_t complex_conj(complex_t z) {
    return complex_new(z.re, -z.im);
}

complex_t complex_exp(complex_t z) {
    double e = exp_val(z.re);
    return complex_new(e * cos_val(z.im), e * sin_val(z.im));
}

void complex_print(complex_t z) {
    if (z.im >= 0)
        printf("%.6f + %.6fi\n", z.re, z.im);
    else
        printf("%.6f - %.6fi\n", z.re, -z.im);
}

// Example usage
int main() {
    // Configure precision (terms, error threshold, pi value)
    setup(15, 1e-12, 3.14159265358979323846);
    
    // Create complex numbers
    complex_t a = complex_new(3.0, 4.0);
    complex_t b = complex_new(1.0, 2.0);
    
    // Perform operations
    printf("a = "); complex_print(a);
    printf("b = "); complex_print(b);
    printf("a + b = "); complex_print(complex_add(a, b));
    printf("a - b = "); complex_print(complex_sub(a, b));
    printf("a * b = "); complex_print(complex_mul(a, b));
    printf("a / b = "); complex_print(complex_div(a, b));
    printf("|a| = %.6f\n", complex_abs(a));
    printf("arg(a) = %.6f\n", complex_arg(a));
    printf("conj(a) = "); complex_print(complex_conj(a));
    printf("exp(a) = "); complex_print(complex_exp(a));
    
    return 0;
}