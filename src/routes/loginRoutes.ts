import {
  Router, Request, Response, NextFunction,
} from 'express';

const router: Router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send(`
    <div>
      <div><h1>You must be logged in to view this page!</h1></div>
      <a href="/login">Login</a>
    </div>
  `);
};

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
  const isValidEmail: boolean = email === 'e@e.io';
  const isValidPass: boolean = password === 'pass';

  if (!isValidEmail || !isValidPass) res.status(401).send('Please enter an email and password');
  else {
    req.session = { loggedIn: true };
    res.redirect('/');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in!</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in!</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send('<div><h1>Welcome to protected route</h1></div>');
});

router.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

export { router };
