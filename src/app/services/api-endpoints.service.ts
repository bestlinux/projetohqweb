// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '@shared/classes/url-builder';
import { QueryStringParameters } from '@shared/classes/query-string-parameters';
// Application Constants
import { Constants } from '@app/config/constants';
@Injectable({
  providedIn: 'root',
})

// Returns the api endpoints urls to use in services in a consistent way
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private constants: Constants
  ) {}

  /* #region EXAMPLES */
  public getDataByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('data', [id]);

  public getDataByIdAndCodeEndpoint = (id: string, code: number): string =>
    this.createUrlWithPathVariables('data', [id, code]);

  public getDataByIdCodeAndYearEndpoint(id: string, code: number, year: number): string {
    const queryString: QueryStringParameters = new QueryStringParameters();
    queryString.push('year', year);
    return `${this.createUrlWithPathVariables('data', [id, code])}?${queryString.toString()}`;
  }

  public getProductListByCountryCodeEndpoint(countryCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) =>
      qs.push('countryCode', countryCode)
    );
  }

  public getProductListByCountryAndPostalCodeEndpoint(countryCode: string, postalCode: string): string {
    return this.createUrlWithQueryParameters('productlist', (qs: QueryStringParameters) => {
      qs.push('countryCode', countryCode);
      qs.push('postalCode', postalCode);
    });
  }

  // call Mock endpoint
  public getNewsEndpoint = (): string => this.createUrl('41gRGwOaw', true);

  public invalidUrlEndpoint = (): string => this.createUrl('invalidurl', true);

  // call regular endpoint without boolean true at end
  public getPersonsEndpoint = (): string => this.createUrl('Persons');

  // Call API technique https://medium.com/better-programming/angular-api-calls-the-right-way-264198bf2c64

  // call Mock endpoint
  // https://angular-datatables-demo-server.herokuapp.com
  public getPositionByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Positions', [id]);

  //ENDPOINT HQS
  public getHQByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Hq', [id]);

  public postHQEndpoint = (): string => this.createUrl('Hq');

  public deleteHQByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Hq', [id]);

  public putHQPagedEndpoint = (id: string): string => this.createUrlWithPathVariables('Hq', [id]);

  public postHQsPagedEndpoint = (): string => this.createUrl('Hq/Paged');

  public postImageUploadEndpoint = (): string => this.createUrl('Hq/UploadImage');

  public postHQsPagedSearchWebEndpoint = (): string => this.createUrl('Hq/PagedSearchWeb');

  public getHQByEditoraQueryEndpoint = (nome: string): string =>
    this.createUrlWithPathVariables('Hq/BuscaPorEditora', [nome]);

  //public getHQInWebEndpoint = (titulo: string, anoLancamento: string, numeroEdicao: string, editora: string, categoria:number, genero:number, status: number, formato:number): string => this.createUrlWithPathVariables('Hq/SearchWeb', [titulo,anoLancamento,numeroEdicao,editora,categoria,genero,status,formato]);

  public getHQInWebEndpoint(
    titulo: string,
    anoLancamento: string,
    numeroEdicao: string,
    editora: string,
    categoria: number,
    genero: number,
    status: number,
    formato: number
  ): string {
    const queryString: QueryStringParameters = new QueryStringParameters();
    /*queryString.push('titulo', titulo);
    queryString.push('anoLancamento', anoLancamento);
    queryString.push('numeroEdicao', numeroEdicao);
    queryString.push('editora', editora);
    queryString.push('categoria', categoria);
    queryString.push('genero', genero);
    queryString.push('status', status);
    queryString.push('formato', formato);*/
    return `${this.createUrlWithPathVariables('Hq/BuscaWeb', [
      titulo,
      editora,
      categoria,
      genero,
      status,
      formato,
      numeroEdicao,
      anoLancamento,
    ])}?${queryString.toString()}`;
  }

  //************************ */

  //ENDPOINT EDITORA

  public getEditoraEndpoint = (): string => this.createUrl('Editora');

  public postEditoraEndpoint = (): string => this.createUrl('Editora');

  public postEditoraPagedEndpoint = (): string => this.createUrl('Editora/Paged');

  public getEditoraByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Editora', [id]);

  public deleteEditoraByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Editora', [id]);

  //********************** */

  public deletePositionByIdEndpoint = (id: string): string => this.createUrlWithPathVariables('Positions', [id]);

  public postPersonsEndpoint = (): string => this.createUrl('', true);

  // call regular endpoint without boolean true at end
  // https://localhost:44378/api/v1 (ASP.NET CORE REST API.  Repo https://github.com/workcontrolgit/AngularNgxDataTableBackend)

  public postPositionsEndpoint = (): string => this.createUrl('Positions');

  public putPositionsPagedEndpoint = (id: string): string => this.createUrlWithPathVariables('Positions', [id]);

  /* #endregion */

  /* #region URL CREATOR */
  // URL
  private createUrl(action: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? this.constants.Api_Mock_Endpoint : this.constants.Api_Endpoint,
      action
    );
    return urlBuilder.toString();
  }

  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.Api_Endpoint, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.Api_Endpoint, `${action}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }
  /* #endregion */
}
