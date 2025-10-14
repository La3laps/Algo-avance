#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

const int ARR_LENGTH = 49;

void print_arr(int arr[], bool sorted);
void merge_sort_arr(int arr[], char *log = nullptr);
void populate_arr(int arr[]);
bool is_number_in_array(int arr[], int number);
bool log_active(char *log);
void simple_print_arr(int arr[]);
void merge_sort(int arr[], int left, int right, char *log);
void merge(int arr[], int left, int mid, int right, char *log);

int main(int argc, char *argv[])
{
    srand(time(0));

    char *log;

    if (argc > 1)
    {
        for (int i = 0; i < argc; i++)
        {
            if (log_active(argv[i]))
            {
                log = argv[i];
            }
        }
    }
    else
    {
        log = nullptr;
    }

    int arr[ARR_LENGTH];
    bool isSorted = false;

    populate_arr(arr);

    print_arr(arr, isSorted);

    merge_sort_arr(arr, log);

    isSorted = true;

    print_arr(arr, isSorted);

    return 0;
}

void merge_sort_arr(int arr[], char *log)
{
    // Log titre
    if (log_active(log))
    {
        cout << "Logs de tri:\n";
        simple_print_arr(arr);
    }

    merge_sort(arr, 0, ARR_LENGTH - 1, log);

    // Retour à la ligne après les logs
    if (log_active(log))
    {
        cout << "\n";
    }
}

void merge_sort(int arr[], int left, int right, char *log)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        merge_sort(arr, left, mid, log);
        simple_print_arr(arr);
        merge_sort(arr, mid + 1, right, log);
        simple_print_arr(arr);
        merge(arr, left, mid, right, log);
        simple_print_arr(arr);
    }
}

void merge(int arr[], int left, int mid, int right, char *log)
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

void print_arr(int arr[], bool sorted = true)
{
    if (sorted)
    {
        cout << "🖥️  \033[1;32mArray trié: \033[0m";
    }
    else
    {
        cout << "\n📍 \033[1;31mArray d'origine: \033[0m";
    }

    for (int i = 0; i < ARR_LENGTH; i++)
    {
        cout << arr[i] << " ";
    }

    cout << "\n";
    cout << endl;
}

void simple_print_arr(int arr[])
{
    cout << "- ";
    for (int i = 0; i < ARR_LENGTH; i++)
    {
        cout << arr[i] << " ";
    }
    cout << "\n";
}

void populate_arr(int arr[])
{
    int temp[ARR_LENGTH];

    for (int i = 0; i < ARR_LENGTH; i++)
    {
        int number = rand() % ARR_LENGTH;
        while (is_number_in_array(temp, number))
        {
            number = rand() % ARR_LENGTH;
        }
        arr[i] = number;
        temp[i] = number;
    }
}

bool is_number_in_array(int arr[], int number)
{
    for (int i = 0; i < ARR_LENGTH; i++)
    {
        if (arr[i] == number)
        {
            return true;
        }
    }
    return false;
}

bool log_active(char *log)
{
    if (log == nullptr)
        return false;
    return (string(log) == "-l" || string(log) == "--log");
}