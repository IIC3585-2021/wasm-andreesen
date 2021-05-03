// Cosigo para las combinaciones obtenido de https://www.codesdope.com/blog/article/generating-permutations-of-all-elements-of-an-arra/

#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

int32_t **matrix = NULL;

//function to print the array
void printarray(int32_t arr[], int32_t size)
{
    int32_t i, j;
    for (i = 0; i < size; i++)
    {
        printf("%d\t", arr[i]);
    }
    printf("\n");
}

//function to swap the variables
void swap(int32_t *a, int32_t *b)
{
    int32_t temp;
    temp = *a;
    *a = *b;
    *b = temp;
}

int32_t tsp_cost(int32_t **graph, int32_t *arr, int32_t size)
{
    int32_t cost = 0;
    for (int32_t i = 0; i < size; i++)
    {
        if (graph[arr[i]][arr[i+1]] == 0) return 0;
        cost += graph[arr[i]][arr[i+1]];
    }
    if (graph[arr[size]][arr[0]] == 0) return 0;
    cost += graph[arr[size]][arr[0]];
    return cost;
}

//permutation function
void permutation(int32_t *arr, int32_t **graph, int32_t *result, int32_t *global_cost, int32_t start, int32_t end)
{
    if (start == end)
    {
        printarray(arr, end + 1);
        int32_t cost = tsp_cost(graph, arr, end);
        if (cost < *global_cost && cost > 0)
        {
            for (int32_t i = 0; i < end + 1; i++)
            {
                result[i] = arr[i];
            }
            *global_cost = cost;
        }
        return;
    }
    int32_t i;
    for (i = start; i <= end; i++)
    {
        //swapping numbers
        swap((arr + i), (arr + start));
        //fixing one first digit
        //and calling permutation on
        //the rest of the digits
        permutation(arr, graph, result, global_cost, start + 1, end);
        swap((arr + i), (arr + start));
    }
}

int32_t main()
{
    //taking input to the array
    int32_t size;
    printf("Enter the size of array\n");
    scanf("%d", &size);
    int32_t i;
    int32_t arr[size];
    for (i = 0; i < size; i++)
        scanf("%d", &arr[i]);

    int32_t parc[4][4] = {{0, 10, 15, 20},
                        {10, 0, 35, 25},
                        {15, 35, 0, 30},
                        {20, 25, 30, 0}};

    int32_t **matrix = (int32_t **)calloc(4, sizeof(*matrix));
    for (int32_t i = 0; i < 4; i++)
        matrix[i] = (int32_t *)calloc(4, sizeof(*matrix[i]));
    for (int32_t i = 0; i < 4; i++)
    {
        for (int32_t j = 0; j < 4; j++)
        {
            matrix[i][j] = parc[i][j];
        }
    }

    int32_t *result = malloc(4 * sizeof(int32_t));
    int32_t *global_cost = malloc(sizeof(int32_t));
    *global_cost = 999999;

    //calling permutation function
    permutation(arr, matrix, result, global_cost, 0, size - 1);

    printf("Final cost %d\n", *global_cost);
    printf("Solucion: \n");
    printarray(result, size);

    free(result);
    free(global_cost);
    for (int32_t i = 0; i < size; i++)
    {
        free(matrix[i]);
    }
    free(matrix);

    return 0;
}