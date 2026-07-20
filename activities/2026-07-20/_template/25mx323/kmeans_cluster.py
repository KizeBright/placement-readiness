import numpy as np
import matplotlib.pyplot as plt

# -----------------------------
# Sample 2D Customer Dataset
# -----------------------------
data = np.array([
    [2, 3],
    [3, 4],
    [3, 3],
    [8, 7],
    [8, 8],
    [7, 7],
    [1, 8],
    [2, 9],
    [1, 9],
    [7, 2],
    [8, 3],
    [9, 2]
])

# Number of clusters
K = 3

# Maximum iterations
max_iterations = 100

# -----------------------------
# Randomly Initialize Centroids
# -----------------------------
np.random.seed(42)
indices = np.random.choice(len(data), K, replace=False)
centroids = data[indices]

print("Initial Centroids:")
print(centroids)

# -----------------------------
# K-Means Algorithm
# -----------------------------
for iteration in range(max_iterations):

    clusters = []

    # Assign each point to nearest centroid
    for point in data:
        distances = []

        for centroid in centroids:
            distance = np.sqrt(np.sum((point - centroid) ** 2))
            distances.append(distance)

        cluster = np.argmin(distances)
        clusters.append(cluster)

    clusters = np.array(clusters)

    # Store old centroids
    old_centroids = centroids.copy()

    # Calculate new centroids
    for i in range(K):
        points = data[clusters == i]

        if len(points) > 0:
            centroids[i] = np.mean(points, axis=0)

    # Stop if centroids don't change
    if np.allclose(old_centroids, centroids):
        print("\nConverged after", iteration + 1, "iterations.")
        break

# -----------------------------
# Display Final Centroids
# -----------------------------
print("\nFinal Centroids:")
print(centroids)

# -----------------------------
# Display Cluster Members
# -----------------------------
for i in range(K):
    print(f"\nCluster {i+1}:")
    print(data[clusters == i])

# -----------------------------
# Visualization
# -----------------------------
colors = ['red', 'green', 'blue']

plt.figure(figsize=(8,6))

for i in range(K):
    points = data[clusters == i]

    plt.scatter(
        points[:,0],
        points[:,1],
        color=colors[i],
        label=f'Cluster {i+1}',
        s=80
    )

# Plot Centroids
plt.scatter(
    centroids[:,0],
    centroids[:,1],
    color='black',
    marker='X',
    s=250,
    label='Centroids'
)

plt.title("K-Means Clustering From Scratch")
plt.xlabel("X Coordinate")
plt.ylabel("Y Coordinate")
plt.legend()
plt.grid(True)

plt.show()