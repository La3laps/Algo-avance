#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

const int ARR_LENGTH = 10;

void print_arr(int arr[], int n, bool sorted);
void sort_arr(int arr[], int n, char *log = nullptr);
void populate_arr(int arr[], int n);
bool is_number_in_array(int arr[], int n, int number);
bool log_active(char *log);
void simple_print_arr(int arr[], int n);

int main(int argc, char *argv[])
{
    srand(time(0));

    int arr[ARR_LENGTH];
    bool isSorted = false;
    char *log;

    if(argc > 1)
    {
        log = argv[1];
    }
    else
    {
        log = nullptr;
    }   

    populate_arr(arr, ARR_LENGTH);

    print_arr(arr, ARR_LENGTH, isSorted);
    sort_arr(arr, ARR_LENGTH, log);

    isSorted = true;

    print_arr(arr, ARR_LENGTH, isSorted);

    return 0;
}

void sort_arr(int arr[], int n, char *log)
{

    if (log_active(log))
    {
        cout << "Logs de tri:\n";
        simple_print_arr(arr, n);
    }

    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                if (log_active(log))
                {
                    simple_print_arr(arr, n);
                }
            }
        }
    }

    if (log_active(log))
    {
        cout << "\n";
    }
}

void print_arr(int arr[], int n, bool sorted = true)
{
    if (sorted)
    {
        cout << "🖥️  \033[1;32mArray trié: \033[0m";
    }
    else
    {
        cout << "\n📍 \033[1;31mArray d'origine: \033[0m";
    }

    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }

    cout << "\n";
    cout << endl;
}

void simple_print_arr(int arr[], int n)
{
    cout << "- ";
    for (int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }
    cout << "\n";
}

void populate_arr(int arr[], int n)
{
    int temp[ARR_LENGTH];

    for (int i = 0; i < n; i++)
    {
        int number = rand() % ARR_LENGTH;
        while (is_number_in_array(temp, i, number))
        {
            number = rand() % ARR_LENGTH;
        }
        arr[i] = number;
        temp[i] = number;
    }
}

bool is_number_in_array(int arr[], int n, int number)
{
    for (int i = 0; i < n; i++)
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
    if (log == nullptr) return false;
    return (string(log) == "-l" || string(log) == "--log");
}