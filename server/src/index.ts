import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'FactoryOS API' }));
app.get('/api/factories/:id/dashboard', (_req, res) => res.json({ message: 'Replace with Prisma-backed dashboard service.' }));
app.post('/api/ai/copilot', (req, res) => res.json({ answer: `FactoryOS AI received: ${req.body?.prompt || ''}` }));

io.on('connection', socket => {
  socket.emit('factory:connected', { status: 'ready' });
});

server.listen(process.env.API_PORT || 4000, () => console.log('FactoryOS API ready'));
