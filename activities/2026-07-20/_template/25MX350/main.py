import numpy as np
import matplotlib.pyplot as plt

from kmeans import KMeans


np.random.seed(42)

cluster1 = np.random.randn(50, 2) + [2, 2]
cluster2 = np.random.randn(50, 2) + [8, 3]
cluster3 = np.random.randn(50, 2) + [5, 8]

X = np.vstack((cluster1, cluster2, cluster3))

model = KMeans(
    k=3,
    random_state=42
)

model.fit(X)

print("Final Centroids:")
print(model.centroids)

print("\nCluster Assignments:")
for i in range(model.k):
    print(f"\nCluster {i}")
    print(X[model.labels == i])

colors = ['red', 'green', 'blue', 'purple', 'orange']

for i in range(model.k):
    points = X[model.labels == i]
    plt.scatter(
        points[:, 0],
        points[:, 1],
        c=colors[i],
        label=f'Cluster {i}'
    )

plt.scatter(
    model.centroids[:, 0],
    model.centroids[:, 1],
    marker='X',
    s=250,
    color='black',
    label='Centroids'
)

plt.title("K-Means Clustering")
plt.legend()
plt.show()
