#include <stdio.h>

int main() {
    int n, i, j, temp;
    int trocas = 0;

    printf("Digite o número de baldes: ");
    scanf("%d", &n);

    int baldes[n];
    printf("Digite a sequência de baldes:\n");
    for (i = 0; i < n; i++) {
        scanf("%d", &baldes[i]);
    }

    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - 1 - i; j++) {
            if (baldes[j] > baldes[j + 1]) {
                temp = baldes[j];
                baldes[j] = baldes[j + 1];
                baldes[j + 1] = temp;
                trocas++;
            }
        }
    }

    printf("Número de trocas realizadas: %d\n", trocas);
    return 0;
}
