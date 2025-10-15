#include <iostream>
#include "visual_sort_utils.h"

int arr_length = 20;
int speed = 1;
int choice;

int main(int argc, char *argv[])
{
    bool arg_check;

    srand(time(0));

    arg_check = check_args_for_program(argc, argv);

    if (arg_check == false)
    {
        return 1;
    }

    launch_app();

    return 0;
}

int launch_app()
{
    int arr[arr_length];
    bool isSorted = false;

    populate_arr(arr);

    input_select_algorithm();

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
    case 4:
        merge_sort_arr(arr, 0, arr_length - 1);
        print_arr(arr, true);
        await_for_retry();
        break;
    case 5:
        quick_sort_arr(arr, 0, arr_length - 1);
        print_arr(arr, true);
        await_for_retry();
        break;
    default:
        clear_shell();
        cout << "\033[31mMauvaise option, fermeture du programme...\033[0m\n";
        return 1;
    }

    isSorted = true;

    print_arr(arr, isSorted);
    return 0;
}