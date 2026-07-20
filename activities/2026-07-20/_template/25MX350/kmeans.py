import numpy as np


class KMeans:
    def __init__(self, k=3, max_iters=100, tolerance=1e-4, random_state=None):
        self.k = k
        self.max_iters = max_iters
        self.tolerance = tolerance
        self.random_state = random_state

        self.centroids = None
        self.labels = None

    def _initialize_centroids(self, X):
        np.random.seed(self.random_state)
        idx = np.random.choice(len(X), self.k, replace=False)
        return X[idx]

    def _assign_clusters(self, X):
        distances = np.linalg.norm(
            X[:, np.newaxis] - self.centroids,
            axis=2
        )
        return np.argmin(distances, axis=1)

    def _update_centroids(self, X, labels):
        new_centroids = []

        for i in range(self.k):
            cluster = X[labels == i]

            if len(cluster) == 0:
                new_centroids.append(
                    X[np.random.randint(0, len(X))]
                )
            else:
                new_centroids.append(cluster.mean(axis=0))

        return np.array(new_centroids)

    def fit(self, X):
        self.centroids = self._initialize_centroids(X)

        for _ in range(self.max_iters):

            labels = self._assign_clusters(X)

            new_centroids = self._update_centroids(X, labels)

            shift = np.linalg.norm(self.centroids - new_centroids)

            self.centroids = new_centroids

            if shift < self.tolerance:
                break

        self.labels = labels
        return self

    def predict(self, X):
        distances = np.linalg.norm(
            X[:, np.newaxis] - self.centroids,
            axis=2
        )
        return np.argmin(distances, axis=1)
