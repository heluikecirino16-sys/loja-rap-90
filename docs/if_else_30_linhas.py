# Exemplo didático de if/elif/else — 30 linhas
# Verifica se um produto pode ser vendido e se há estoque.

nome = input("Nome do produto: ")
preco = float(input("Preço do produto: R$ "))
estoque = int(input("Quantidade em estoque: "))
ativo = input("Produto ativo? (s/n): ").strip().lower()

if preco < 0:
    print("O preço não pode ser negativo.")
elif estoque < 0:
    print("O estoque não pode ser negativo.")
elif ativo != "s":
    print("Produto indisponível para venda.")
elif estoque == 0:
    print("Produto sem estoque.")
elif preco == 0:
    print("Confira o preço antes de vender.")
else:
    print("Produto disponível para venda!")
    print("Nome:", nome)
    print("Preço: R$", preco)
    print("Unidades disponíveis:", estoque)

if estoque > 10:
    print("Estoque suficiente.")
elif estoque > 0:
    print("Estoque baixo: considere repor.")
else:
    print("É necessário repor o produto.")

if preco >= 500:
    print("Produto de valor alto.")
else:
    print("Produto de valor até R$ 499,99.")
