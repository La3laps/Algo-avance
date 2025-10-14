#include <iostream>
#include "visual_sort_utils.h"

//////////////////////////////////////
////////// INSERTION SORT ////////////
//////////////////////////////////////

void insertion_sort_arr(int arr[])
{
    int i, j;

    for (i = 1; i < arr_length; i++)
    {
        int current_nbr = arr[i];

        for (j = i; j > 0 && arr[j - 1] > current_nbr; j--)
        {
            arr[j] = arr[j - 1];
            print_arr(arr, false);
        }
        arr[j] = current_nbr;
    }
    print_arr(arr, true);
    await_for_retry();
}

//////////////////////////////////////
//////////// BUBBLE SORT /////////////
//////////////////////////////////////

void bubble_sort_arr(int arr[])
{
    int i, j;
    bool swapped;

    for (i = 0; i < arr_length - 1; i++)
    {
        swapped = false;

        for (j = 0; j < arr_length - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                swapped = true;
                print_arr(arr, false);
            }
        }

        if (!swapped)
        {
            print_arr(arr, true);
            break;
        }
    }
    await_for_retry();
}

//////////////////////////////////////
////////// SELECTION SORT ////////////
//////////////////////////////////////

void selection_sort_arr(int arr[])
{
    int i, j, min_idx;

    for (i = 0; i < arr_length - 1; i++)
    {
        min_idx = i;

        for (j = i + 1; j < arr_length; j++)
        {
            if (arr[j] < arr[min_idx])
            {
                min_idx = j;
            }
        }

        if (min_idx != i)
        {
            swap(arr[i], arr[min_idx]);
            print_arr(arr, false);
        }
    }
    print_arr(arr, true);
    await_for_retry();
}

//////////////////////////////////////
//////////// MERGE SORT //////////////
//////////////////////////////////////

void merge_sort_arr(int arr[], int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        merge_sort_arr(arr, left, mid);
        print_arr(arr, false);
        merge_sort_arr(arr, mid + 1, right);
        print_arr(arr, false);
        merge(arr, left, mid, right);
        print_arr(arr, false);
    }
}

void merge(int arr[], int left, int mid, int right)
{
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int *L = new int[n1];
    int *R = new int[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k++] = L[i++];
        }
        else
        {
            arr[k++] = R[j++];
        }
    }

    while (i < n1)
        arr[k++] = L[i++];

    while (j < n2)
        arr[k++] = R[j++];

    delete[] L;
    delete[] R;
}

//////////////////////////////////////
//////////// QUICK SORT //////////////
//////////////////////////////////////

void quick_sort_arr(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);

        print_arr(arr, false);

        quick_sort_arr(arr, low, pi - 1);
        quick_sort_arr(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high)
{
    int pivot = arr[high];
    int i = (low - 1);

    for (int j = low; j < high; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(arr[i], arr[j]);
            print_arr(arr, false);
        }
    }
    swap(arr[i + 1], arr[high]);
    print_arr(arr, false);
    return (i + 1);
}