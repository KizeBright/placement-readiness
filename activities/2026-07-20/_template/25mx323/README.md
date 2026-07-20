# Thorogood Associates Technical Challenge
## K-Means Clustering Algorithm (From Scratch)

## Overview

This project implements the K-Means Clustering algorithm from scratch using Python without relying on machine learning libraries such as Scikit-learn. The objective is to cluster a set of two-dimensional customer coordinates into **K distinct zones** by iteratively assigning data points to the nearest centroid and recalculating centroid positions until convergence.

The implementation demonstrates the core concepts of unsupervised machine learning while focusing on algorithmic understanding rather than library usage.

---

## Problem Statement

Given a set of customer coordinates in a two-dimensional space:

- Implement K-Means Clustering from scratch.
- Divide customers into **K clusters**.
- Compute the final centroid coordinates.
- Display clustered points and centroid positions.
- Optionally visualize the clusters using Matplotlib.

---

## Objectives

- Implement Euclidean distance calculation.
- Randomly initialize K centroids.
- Assign each point to the nearest centroid.
- Update centroid positions based on cluster means.
- Repeat until centroids no longer change or maximum iterations are reached.
- Output final clusters and centroid coordinates.

---

## Project Architecture

```
                Input Dataset
                      │
                      ▼
         Random Centroid Initialization
                      │
                      ▼
         Distance Calculation (Euclidean)
                      │
                      ▼
        Assign Points to Nearest Cluster
                      │
                      ▼
         Compute New Centroid Positions
                      │
                      ▼
        Convergence Check
          │                 │
          │ No              │ Yes
          ▼                 ▼
     Repeat Process     Final Clusters
                             │
                             ▼
                 Cluster Visualization
```

---

## Algorithm Workflow

1. Read the customer coordinates.
2. Choose K initial centroids randomly.
3. Compute the Euclidean distance from every point to each centroid.
4. Assign each point to the nearest centroid.
5. Compute the new centroid by taking the average of all points in each cluster.
6. Repeat until centroids stabilize or the maximum number of iterations is reached.
7. Print the final clusters and centroid coordinates.

---

## Time Complexity Analysis

### Distance Calculation

For every iteration, every point is compared with every centroid.

Time Complexity:

```
O(n × k)
```

where:

- n = number of data points
- k = number of clusters

---

### Centroid Update

Each point contributes once to the computation of its cluster mean.

Time Complexity:

```
O(n)
```

---

### Overall Complexity

If the algorithm converges after **i** iterations,

```
O(i × n × k)
```

---

## Space Complexity

The algorithm stores:

- Dataset
- Cluster labels
- Centroid coordinates

Overall Space Complexity:

```
O(n + k)
```

---

## Design Decisions

- Implemented from scratch without Scikit-learn.
- Used Euclidean Distance as the similarity metric.
- Modular functions for initialization, assignment, centroid update, and convergence.
- Iterative refinement until convergence.
- Visualization performed using Matplotlib for better understanding.

---

## Advantages

- Easy to understand and implement.
- Efficient for moderate-sized datasets.
- Fast convergence in most practical scenarios.
- Useful for customer segmentation and geographical clustering.

---

## Limitations

- Requires choosing the value of K beforehand.
- Sensitive to centroid initialization.
- May converge to a local optimum.
- Performance decreases with high-dimensional data.

---

## Future Improvements

- K-Means++
- Elbow Method for selecting optimal K
- Silhouette Score evaluation
- Support for higher-dimensional datasets
- Interactive visualization
- Parallel implementation for large datasets

---

## Technologies Used

- Python
- NumPy
- Matplotlib

---

## Conclusion

This project demonstrates a complete implementation of the K-Means Clustering algorithm without external machine learning libraries. It provides a deeper understanding of clustering, centroid optimization, convergence, and algorithmic complexity while showcasing the fundamentals of unsupervised learning.
