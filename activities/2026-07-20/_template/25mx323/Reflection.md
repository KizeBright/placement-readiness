# Reflection

## Overview

This challenge provided valuable experience in implementing one of the most fundamental unsupervised machine learning algorithms from scratch. Instead of using Scikit-learn, I focused on understanding the mathematical concepts behind clustering and translating them into code.

---

## What I Learned

- Working with unsupervised learning algorithms.
- Computing Euclidean distance manually.
- Random centroid initialization.
- Iterative optimization techniques.
- Updating centroids using cluster means.
- Detecting convergence conditions.
- Organizing code into reusable modules.

---

## Challenges Faced

### Centroid Initialization

Choosing random centroids significantly affects the final clustering result. Different initial centroids can lead to different solutions.

### Distance Computation

Efficiently calculating the nearest centroid for every point required careful implementation of the Euclidean distance formula.

### Convergence Detection

Determining when the centroids no longer change was essential to avoid unnecessary iterations.

---

## Performance Analysis

The implementation has:

- Distance Computation: O(n × k)
- Centroid Update: O(n)
- Overall Complexity: O(i × n × k)

where **i** represents the number of iterations until convergence.

---

## Possible Improvements

- Implement K-Means++ initialization.
- Automatically determine the optimal K using the Elbow Method.
- Support high-dimensional datasets.
- Add animation to visualize centroid movement.
- Optimize performance using parallel computing techniques.

---

## Final Thoughts

Building the K-Means algorithm from scratch strengthened my understanding of clustering, optimization, and iterative algorithms. This exercise emphasized the importance of algorithm design, modular implementation, and computational complexity in developing scalable machine learning solutions.