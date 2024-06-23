import { BadRequestException, Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

@Injectable()
class MongooseExeptionHandlerService {
  private mongooseErrorMessages = new Map<any, string>([
    [
      MongooseError.DivergentArrayError,
      'Erro de manipulação de array divergente',
    ],
    [MongooseError.MissingSchemaError, 'Erro de esquema ausente'],
    [MongooseError.DocumentNotFoundError, 'Documento não encontrado'],
    [MongooseError.ValidatorError, 'Erro de validação do documento'],
    [MongooseError.ValidationError, 'Erro de validação do documento'],
    [MongooseError.CastError, 'Erro de conversão de tipo'],
    [MongooseError.ObjectParameterError, 'Parâmetro de objeto inválido'],
    [MongooseError.OverwriteModelError, 'Modelo já definido'],
    [MongooseError.ParallelSaveError, 'Operação de salvamento paralelo'],
    [MongooseError.StrictModeError, 'Operação não permitida em modo estrito'],
    [MongooseError.VersionError, 'Documento desatualizado'],
    [MongooseError, 'Erro interno do banco de dados'],
  ]);

  mongoErrorMessages = {
    18: 'Erro de autenticação: Falha na autenticação com o MongoDB',
    50: 'Erro de timeout: Timeout ao executar operação no MongoDB',
    59: 'Erro de comando inválido: Comando inválido enviado ao MongoDB',
    73: 'Erro de comando inválido: Comando inválido enviado ao MongoDB',
    89: 'Erro de timeout: Timeout ao executar operação no MongoDB',
    91: 'Erro de timeout: Timeout ao executar operação no MongoDB',
    11000:
      'Erro de chave duplicada: Já existe um documento com esse valor único no MongoDB',
    11001:
      'Erro de chave duplicada: Já existe um documento com esse valor único no MongoDB',
    121: 'Erro de validação: Falha na validação do documento no MongoDB',
    6: 'Erro de conexão: Falha na conexão com o MongoDB',
    7: 'Erro de conexão: Falha na conexão com o MongoDB',
    // Adicione mais mensagens conforme necessário
  };

  handlerError(error: any) {
    for (const [
      errorType,
      errorMessage,
    ] of this.mongooseErrorMessages.entries()) {
      if (error instanceof errorType) {
        throw new BadRequestException(errorMessage);
      }
      if (error instanceof MongoServerError) {
        console.log('aqui');
        throw new BadRequestException(this.mongoErrorMessages[error.code]);
      }
    }
    console.log('Erro desconhecido:', error);
    throw new Error(`Erro desconhecido: ${error}`);
  }
}

export default MongooseExeptionHandlerService;
