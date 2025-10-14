#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <chrono>
#include <thread>

using namespace std;

int arr_length = 50;
int speed = 1;

int launch_app();
bool check_args_for_program(int argc, char *argv[]);
void print_arr(int arr[], bool sorted);
void bubble_sort_arr(int arr[]);
void insertion_sort_arr(int arr[]);
void selection_sort_arr(int arr[]);
void populate_arr(int arr[]);
bool is_number_in_array(int arr[], int number);
int input_select_algorithm();
void await_for_retry();
void clear_shell();
void print_flag_error();

int main(int argc, char *argv[])
{
    bool arg_check;

    srand(time(0));

    arg_check = check_args_for_program(argc, argv);

    if (arg_check == false)
    {
        return 1;
    }

    cout << speed;
    launch_app();

    return 0;
}

bool check_args_for_program(int argc, char *argv[])
{
    switch (argc)
    {
    case 1:
        return true;
    case 2:
        if (string(argv[1]) == "-h" || string(argv[1]) == "--help")
        {
            cout << "Pour lancer le programme, se mettre dans le dossier algo-av et compiler puis lancer avec cette commande:\n\n"
                 << "           ./sorting\n\n"
                 << "   Usage : visual-sort [no-args]         default speed is slowest\n"
                 << "           visual-sort [speed]           speed range goes from 1 (slowest) to 5 (fastest)\n"
                 << "           visual-sort [numbers]         the numbers in the array go from 10 to 50 for visual reasons.\n"
                 << "           visual-sort [speed][numbers]  the program will look for numbers smaller or equal to 5 for speed.\n"
                 << "                                         and numbers that range from 10 to 50 for the array numbers.\n";
            return false;
        }
        else if (atoi(argv[1]) > 0 && atoi(argv[1]) < 6)
        {
            speed = atoi(argv[1]);
        }
        else if (atoi(argv[1]) >= 10 && atoi(argv[1]) <= 50)
        {
            arr_length = atoi(argv[1]);
        }
        else
        {
            print_flag_error();
            return false;
        }
        return true;
    case 3:

        for (int i = 1; i < argc - 1; i++)
        {
            if (atoi(argv[i]) > 0 && atoi(argv[i]) <= 50)
            {
                if (atoi(argv[i]) > 0 && atoi(argv[i]) < 6)
                {
                    speed = atoi(argv[i]);
                }
                else if (atoi(argv[i]) >= 10 && atoi(argv[i]) <= 50)
                {
                    arr_length = atoi(argv[i]);
                }
            }
            else
            {
                print_flag_error();
                return false;
            }
        }

        return true;

    default:
        print_flag_error();
        return false;
    }
}

void print_flag_error()
{
    cout << "\e[0;31mErreur, nombre de flags incorrects.\n"
         << "\e[0;36mPour plus d'informations, utilisez:\n"
         << "       'visual-sort -h'        ou      'visual-sort --help'\n\n";
}

int launch_app()
{
    int arr[arr_length];
    bool isSorted = false;

    populate_arr(arr);

    int choice = input_select_algorithm();

    switch (choice)
    {
    case 1:
        bubble_sort_arr(arr);
        break;
    case 2:
        insertion_sort_arr(arr);
        break;
    case 3:
        selection_sort_arr(arr);
        break;
    default:
        cout << "\033[31mFermeture du programme...\033[0m\n";
        return 1;
    }

    isSorted = true;

    print_arr(arr, isSorted);
    return 0;
}

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

void print_arr(int arr[], bool sorted)
{
    clear_shell();

    cout << (sorted ? "\033[32mTri effectué:\033[0m\n" : "\033[31mEn cours de tri...\033[0m\n");

    for (int i = 0; i < arr_length; i++)
    {
        cout << " | \e[0;33m" << string(arr[i] * 3 + 1, '=') << "\033[0m(\e[0;33m" + to_string(arr[i] + 1) + "\033[0m)" << "\n";
    }

    cout << endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100 / speed));
}

void populate_arr(int arr[])
{
    vector<int> temp(arr_length, -1);

    for (int i = 0; i < arr_length; i++)
    {
        int number = rand() % arr_length;
        while (is_number_in_array(temp.data(), number))
        {
            number = rand() % arr_length;
        }
        arr[i] = number;
        temp[i] = number;
    }
}

bool is_number_in_array(int arr[], int number)
{
    for (int i = 0; i < arr_length; i++)
    {
        if (arr[i] == number)
        {
            return true;
        }
    }
    return false;
}

int input_select_algorithm()
{
    int choice;
    cout << "Choisir un algorithme:\n\033[32m[1]\033[0m - 🫧  Bubble Sort\n\033[32m[2]\033[0m - 📍 Insertion Sort\n\033[32m[3]\033[0m - 📎 Selection Sort\n";
    cin >> choice;
    return choice;
}

void await_for_retry()
{
    std::this_thread::sleep_for(std::chrono::seconds(2));

    clear_shell();

    launch_app();
}

void clear_shell()
{
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}