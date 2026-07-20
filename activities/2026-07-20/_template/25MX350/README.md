# K-Means Clustering From Scratch

## Objective

This project implements the K-Means clustering algorithm without using Scikit-learn.

The algorithm groups customer coordinates into K clusters and computes the final centroid for each cluster.

---

## Features

- Pure Python implementation
- Uses NumPy for vectorized computation
- Handles empty clusters
- Visualization using Matplotlib
- Configurable:
  - Number of clusters
  - Maximum iterations
  - Tolerance
  - Random seed

---

## Algorithm

### Step 1

Randomly initialize K centroids.

### Step 2

Assign every point to the closest centroid.

### Step 3

Recalculate centroids using the mean of all assigned points.

### Step 4

Repeat until convergence or maximum iterations.

---

## Architecture

The implementation follows an object-oriented design.

### KMeans Class

Responsible for:

- centroid initialization
- cluster assignment
- centroid updates
- convergence detection
- prediction

Internal methods:

```text
fit()
    |
    |-- initialize_centroids()
    |
    |-- assign_clusters()
    |
    |-- update_centroids()
    |
    ---> convergence check
