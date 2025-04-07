import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Role from '../entities/Role';
import { TokenPayload } from '../services/AuthService';
import Permission from '../entities/Permission';

const authenticate = (listaPermissoes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const decodedTokenPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as any
      );

      const roles = JSON.parse((decodedTokenPayload as TokenPayload).roles);

      let hasPermission = false;

      roles.map((r: Role) => {
        if (r.description === 'admin') {
          hasPermission = true;
          return;
        }

        r.permissions.map((p: Permission) => {
          if (listaPermissoes.includes(p.description)) {
            hasPermission = true;
          }
        });
      });

      if (!hasPermission) {
        return res.status(401).json({
          message: 'Você não tem autorização para acessar esse recurso',
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
  };
};

export default authenticate;