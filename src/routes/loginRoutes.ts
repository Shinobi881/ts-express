import { Router, Request, Response } from 'express';

const router: Router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" type="email" placeholder="email address..." />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" placeholder="login password..." />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) res.status(401).send('Please enter an email and password');

  else res.send(email + password);
});

export { router };
