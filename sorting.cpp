#include <iostream>
using namespace std;

const int ARR_LENGTH = 8;

void print_arr(int arr[], int n, bool sorted);
void sort_arr(int arr[], int n);

int main()
{
    int arr[ARR_LENGTH] = {9, 8, 7, 6, 5, 4, 3, 2};
    bool isSorted = false;

    print_arr(arr, ARR_LENGTH, isSorted);
    sort_arr(arr, ARR_LENGTH);

    isSorted = true;

    print_arr(arr, ARR_LENGTH, isSorted);

    return 0;
}

void sort_arr(int arr[], int n)
{
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void print_arr(int arr[], int n, bool sorted = true)
{
    if (sorted)
    {
        cout << "Sorted array: ";
    }
    else
    {
        cout << "\nOriginal array: ";
    }

    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }

    cout << "\n";
    cout << endl;
}
