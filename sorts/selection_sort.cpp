#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

const int ARR_LENGTH = 10;

void print_arr(int arr[], bool sorted);
void selection_sort_arr(int arr[], char *log = nullptr);
void populate_arr(int arr[]);
bool is_number_in_array(int arr[], int number);
bool log_active(char *log);
void simple_print_arr(int arr[]);

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

    selection_sort_arr(arr, log);

    isSorted = true;

    print_arr(arr, isSorted);

    return 0;
}

void selection_sort_arr(int arr[], char *log)
{
    int i, j;

    // Log titre
    if (log_active(log))
    {
        cout << "Logs de tri:\n";
        simple_print_arr(arr);
    }

    for (i = 0; i < ARR_LENGTH; i++)
    {
        int min = i;

        for (j = i + 1; j < ARR_LENGTH; j++)
        {
            if (arr[j] < arr[min])
            {
                min = j;
            }
        }

        int temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;

        if (log_active(log))
        {
            simple_print_arr(arr);
        }
    }

    // Retour à la ligne après les logs
    if (log_active(log))
    {
        cout << "\n";
    }
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