import { Router, Request, Response } from 'express';

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Hello World!</h1>
    </div>
  `);
});

export { router };
