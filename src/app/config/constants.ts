// Angular Modules
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class Constants {
  public readonly Api_Endpoint: string = environment.Api_Endpoint;
  public readonly Api_Mock_Endpoint: string = environment.Api_Mock_Endpoint;

  lido = [
    {
      nome: 'Não',
      codigo: 0,
    },
    {
      nome: 'Sim',
      codigo: 1,
    },
  ];

  categorias = [
    {
      nome: 'Nenhuma',
      codigo: 0,
    },
    {
      nome: 'Álbum de Luxo',
      codigo: 3,
    },
    {
      nome: 'Edição Encadernada',
      codigo: 5,
    },
    {
      nome: 'Edição Especial',
      codigo: 6,
    },
    {
      nome: 'Graphic Novel',
      codigo: 1,
    },
    {
      nome: 'Minissérie',
      codigo: 2,
    },
    {
      nome: 'Revista Periódica',
      codigo: 4,
    },
  ];

  formatos = [
    {
      nome: 'Nenhum',
      codigo: 0,
    },
    {
      nome: 'Americano (17 x 26 cm)',
      codigo: 6,
    },
    {
      nome: 'Americano (17,5 x 26 cm)',
      codigo: 9,
    },
    {
      nome: 'Americano (18 x 30 cm)',
      codigo: 3,
    },
    {
      nome: 'Formatinho (13,5 x 19 cm)',
      codigo: 2,
    },
    {
      nome: 'Formatinho (13,5 x 20,5 cm)',
      codigo: 10,
    },
  ];

  status = [
    {
      nome: 'Nenhum',
      codigo: 0,
    },
    {
      nome: 'Edição única',
      codigo: 3,
    },
    {
      nome: 'Em circulação',
      codigo: 1,
    },
    {
      nome: 'Série completa',
      codigo: 4,
    },
    {
      nome: 'Título encerrado',
      codigo: 2,
    },
  ];

  generos = [
    {
      nome: 'Nenhum',
      codigo: 0,
    },
    {
      nome: 'Adaptação',
      codigo: 25,
    },
    {
      nome: 'Alternativo',
      codigo: 6,
    },
    {
      nome: 'Aventura',
      codigo: 17,
    },
    {
      nome: 'Clássico',
      codigo: 5,
    },
    {
      nome: 'Drama',
      codigo: 12,
    },
    {
      nome: 'Educacional',
      codigo: 23,
    },
    {
      nome: 'Erótico',
      codigo: 8,
    },
    {
      nome: 'Espada e Magia',
      codigo: 20,
    },
    {
      nome: 'Europeu',
      codigo: 7,
    },
    {
      nome: 'Fantasia',
      codigo: 9,
    },
    {
      nome: 'Fanzine',
      codigo: 19,
    },
    {
      nome: 'Faroeste',
      codigo: 11,
    },
    {
      nome: 'Ficcão Científica',
      codigo: 10,
    },
    {
      nome: 'Guerra',
      codigo: 16,
    },
    {
      nome: 'Humor',
      codigo: 3,
    },
    {
      nome: 'Infantil',
      codigo: 2,
    },
    {
      nome: 'Institucional',
      codigo: 21,
    },
    {
      nome: 'Juvenil',
      codigo: 22,
    },
    {
      nome: 'Mangá',
      codigo: 4,
    },
    {
      nome: 'Policial',
      codigo: 14,
    },
    {
      nome: 'Revista de Informação',
      codigo: 18,
    },
    {
      nome: 'Romance',
      codigo: 24,
    },
    {
      nome: 'Super-heróis',
      codigo: 1,
    },
    {
      nome: 'Suspense',
      codigo: 15,
    },
    {
      nome: 'Terror',
      codigo: 13,
    },
  ];
}
