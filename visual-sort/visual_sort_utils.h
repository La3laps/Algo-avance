#ifndef VISUAL_SORT_UTILS_H
#define VISUAL_SORT_UTILS_H
#include <cstdlib>
#include <ctime>
#include <vector>
#include <chrono>
#include <thread>

using namespace std;

extern int speed;
extern int arr_length;
extern int choice;

int launch_app();
bool check_args_for_program(int argc, char *argv[]);
void print_arr(int arr[], bool sorted);
void populate_arr(int arr[]);

void bubble_sort_arr(int arr[]);
void insertion_sort_arr(int arr[]);
void selection_sort_arr(int arr[]);
void merge_sort_arr(int arr[], int left, int right);
void quick_sort_arr(int arr[], int low, int high);

int partition(int arr[], int low, int high);
void merge(int arr[], int left, int mid, int right);

bool is_number_in_array(int arr[], int number);
void input_select_algorithm();

void await_for_retry();
void clear_shell();
void print_flag_error();

#endif