#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

int32_t **matrix = NULL;


int32_t travelingSalesmanProblem(int32_t **graph, int32_t size, int32_t start, int32_t *cities_order)
{
    // Orden Final
    for (int32_t i = 0; i < 4; i++)
    {
        cities_order[i] = 0;
    }
    cities_order[0] = start;

    //Ciudades Visitadas
    int32_t visited[size];
    for (int32_t i = 0; i < 4; i++)
    {
        visited[i] = 0;
    }
    visited[start] = 1;

    // Counters
    int32_t total_cost = 0;
    int32_t visited_count = 1;

    while (visited_count < size)
    {
        int32_t new_city = 0;
        int32_t cost = INT_MAX;

        for (int32_t i = 0; i < size; i++)
        {
            if (visited[i] == 0 && graph[cities_order[visited_count - 1]][i] != 0 && cost > graph[cities_order[visited_count - 1]][i])
            {
                cost = graph[cities_order[visited_count - 1]][i];
                new_city = i;
            }
        }
        cities_order[visited_count] = new_city;
        visited_count++;
        visited[new_city] = 1;
        total_cost += cost;
    }
    total_cost += graph[cities_order[size - 1]][start];

    return total_cost;
}


int32_t main()
{
    int32_t parc[4][4] = {{0, 10, 15, 20},
                            {10, 0, 35, 25},
                            {15, 35, 0, 30},
                            {20, 25, 30, 0}};
    int32_t **matrix = (int **)calloc(4, sizeof(*matrix));
    for (int32_t i = 0; i < 4; i++)
        matrix[i] = (int *)calloc(4, sizeof(*matrix[i]));
    for (int32_t i = 0; i < 4; i++)
    {
        for (int32_t j = 0; j < 4; j++)
        {
            matrix[i][j] = parc[i][j];
        }
    }
    int32_t *results = malloc(4 * sizeof(int32_t));
    int32_t *final;
    int32_t new_cost;
    int32_t cost = INT_MAX;
    for (int32_t i = 0; i < 4; i++)
    {
        new_cost = travelingSalesmanProblem(matrix, 4, i, results);
        printf("%d\n", new_cost);
        if (new_cost < cost)
        {
            cost = new_cost;
            final = results;
        }
    }

    printf("Total cost: %d\n", cost);
    for (int32_t i = 0; i < 4; i++)
    {
        printf("   -> %d\n", final[i]);
    }

    free(results);
    free(matrix);
    return 0;
}