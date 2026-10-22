import type { AxiosResponse } from "axios";

export type ServiceResponse<T = AxiosResponse> = {
  success: boolean;
  data?: T;
  error?: string;
  // Código HTTP del error, si hubo respuesta (p. ej. 404 en la consulta por DNI).
  status?: number;
};
