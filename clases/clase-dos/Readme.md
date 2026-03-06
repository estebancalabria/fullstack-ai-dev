# Clase Dos - 6 de Marzo del 2024

# Repaso

* Roadmap del Curso
* Arquitectura Full Stack
* Hicimos un diagrama de la arquitectura con Mermaid
* Tiobe Index : https://www.tiobe.com/tiobe-index/
* Python
  * Verificamos que lo teniamos instalado localmente
      * Interprete de python
  * Entorno tipo Notebbok como Google Colab
  * Los ide : VS Code, Cursor, AntiGravity , Windsurf
* Github
  * Cada uno tiene un Repo Propio aca figura : https://github.com/estebancalabria/fullstack-ai-dev/tree/main/alumnos/2026-03
* Vimos como usar la IA para programar
  * Hicimos el ejemplo del Pong con Claude
* Seguir al profe en Instagram

# Git

* Instalar CLI git
> https://git-scm.com/install/
* Luego de Instalar reiniciar la terminal
* Cada uno va a "clonar" su repo localmente
```cmd
git clone <URL DE SU REPO>
```
* Por ejemplo para bajar este repo deberiamos hacer:
```cmd
git clone https://github.com/estebancalabria/fullstack-ai-dev.git
```

# Cursor (IDE)

* Es ideal para proyectos grandes, indexa muy bien todo el codebase (la base de codigo)
> https://www.instagram.com/p/DPWOQ-HjoEr/?img_index=1

# VSCode (DE)

* Con el CLI
```cmd
code .
```
* Abri un vscode en el directorio actual
* Esta herramienta se puede enriquecer con extensiones como por ejemplo:
  * GitHub Copilot: https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat
  * Live Share : https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare
  

# Fundamentos de Python

* Python es grodo por
    * Su ecosistema de librerias.
      * Ejemplo de Librerias
        * PyGame : https://www.pygame.org/news
        * Compilado de Liberias de Python  : https://www.instagram.com/p/DPmewyVjs88/?img_index=1
    * Busca su facilida de lecura
    
* El Colab del Dia
> https://colab.research.google.com/drive/1krQMG44XyADrY_tOUbKeRlCWvuOVy4Wl?usp=sharing

* Ejecutamos un codigo localmente
* Este archivo saludar.py
```python
nombre = input("¿Cuál es tu nombre? ")
print(f"Hola {nombre}, ¡bienvenido a la programación en Python!")
```
* Lo ejecutamos
```cmd
python saludar.py
```

* Vamos a hacer algo mas jugado con Claude
* Selo pedi a Claude pero se me rebelo y me lo hacia en html. Tuve que ser mas claro con el prompt: https://claude.ai/share/4d201e60-90b9-4b15-a435-4dfafc38ff36
  
```python
import pygame
import random
import sys

# --- Configuración ---
COLS, ROWS = 25, 25
CELL = 24
WIDTH = COLS * CELL
HEIGHT = ROWS * CELL
FPS = 60

# Colores
BG        = (10, 15, 10)
GRID      = (13, 31, 13)
GREEN     = (57, 255, 20)
GREEN_DIM = (26, 122, 9)
GREEN_MID = (34, 204, 8)
RED       = (255, 34, 68)
AMBER     = (255, 170, 0)
BLACK     = (0, 0, 0)
WHITE     = (255, 255, 255)

pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT + 60))
pygame.display.set_caption("VÍBORA")
clock = pygame.time.Clock()

try:
    font_big   = pygame.font.SysFont("couriernew", 28, bold=True)
    font_med   = pygame.font.SysFont("couriernew", 18, bold=True)
    font_small = pygame.font.SysFont("couriernew", 13, bold=True)
except:
    font_big   = pygame.font.SysFont(None, 32)
    font_med   = pygame.font.SysFont(None, 22)
    font_small = pygame.font.SysFont(None, 16)


# --- Partículas ---
class Particle:
    def __init__(self, x, y, color):
        angle = random.uniform(0, 2 * 3.14159)
        speed = random.uniform(1, 4)
        self.x = x
        self.y = y
        self.vx = speed * pygame.math.Vector2(1, 0).rotate_rad(angle).x
        self.vy = speed * pygame.math.Vector2(1, 0).rotate_rad(angle).y
        self.life = random.randint(15, 30)
        self.max_life = self.life
        self.color = color
        self.size = random.randint(2, 4)

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.life -= 1

    def draw(self, surface):
        alpha = int(255 * self.life / self.max_life)
        r, g, b = self.color
        color = (r, g, b)
        pygame.draw.circle(surface, color, (int(self.x), int(self.y)), self.size)


# --- Juego ---
class SnakeGame:
    def __init__(self):
        self.high_score = 0
        self.reset()
        self.state = "menu"   # menu | playing | paused | dead

    def reset(self):
        cx, cy = COLS // 2, ROWS // 2
        self.snake = [
            {"x": cx,     "y": cy},
            {"x": cx - 1, "y": cy},
            {"x": cx - 2, "y": cy},
        ]
        self.direction  = (1, 0)
        self.next_dir   = (1, 0)
        self.score      = 0
        self.level      = 1
        self.particles  = []
        self.bonus      = None
        self.bonus_countdown = 0
        self.bonus_timer     = 0
        self.frame           = 0
        self.level_msg       = ""
        self.level_msg_timer = 0
        self.spawn_food()

    def spawn_food(self):
        occupied = {(s["x"], s["y"]) for s in self.snake}
        while True:
            pos = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
            if pos not in occupied:
                self.food = pos
                break

    def spawn_bonus(self):
        occupied = {(s["x"], s["y"]) for s in self.snake}
        occupied.add(self.food)
        while True:
            pos = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
            if pos not in occupied:
                self.bonus = pos
                self.bonus_countdown = 80
                break

    def get_speed(self):
        # Retorna milisegundos entre pasos
        return max(60, 150 - (self.level - 1) * 15)

    def spawn_particles(self, gx, gy, color, count=12):
        cx = (gx + 0.5) * CELL
        cy = (gy + 0.5) * CELL + 60
        for _ in range(count):
            self.particles.append(Particle(cx, cy, color))

    def check_level(self):
        new_level = self.score // 100 + 1
        if new_level > self.level:
            self.level = new_level
            self.level_msg = f"--- NIVEL {self.level} ---"
            self.level_msg_timer = 120

    def update(self):
        if self.state != "playing":
            return

        self.frame += 1

        # Partículas
        for p in self.particles:
            p.update()
        self.particles = [p for p in self.particles if p.life > 0]

        # Bonus spawn
        self.bonus_timer += 1
        if not self.bonus and self.bonus_timer % 30 == 0 and random.random() < 0.3:
            self.spawn_bonus()
        if self.bonus:
            self.bonus_countdown -= 1
            if self.bonus_countdown <= 0:
                self.bonus = None

        # Mensaje de nivel
        if self.level_msg_timer > 0:
            self.level_msg_timer -= 1

        # Movimiento (cadencia controlada por timer externo)
        self.direction = self.next_dir
        dx, dy = self.direction
        head = {"x": self.snake[0]["x"] + dx, "y": self.snake[0]["y"] + dy}

        # Colisión con paredes
        if not (0 <= head["x"] < COLS and 0 <= head["y"] < ROWS):
            self.die()
            return

        # Colisión consigo misma
        if any(s["x"] == head["x"] and s["y"] == head["y"] for s in self.snake):
            self.die()
            return

        self.snake.insert(0, head)

        ate = False
        if head["x"] == self.food[0] and head["y"] == self.food[1]:
            self.score += self.level * 10
            self.spawn_particles(self.food[0], self.food[1], RED, 10)
            self.spawn_food()
            ate = True
            self.check_level()
        elif self.bonus and head["x"] == self.bonus[0] and head["y"] == self.bonus[1]:
            self.score += self.level * 30
            self.spawn_particles(self.bonus[0], self.bonus[1], AMBER, 16)
            self.bonus = None
            ate = True
            self.check_level()

        if not ate:
            self.snake.pop()

        if self.score > self.high_score:
            self.high_score = self.score

    def die(self):
        self.state = "dead"
        if self.score > self.high_score:
            self.high_score = self.score

    def draw_grid(self, surface):
        for x in range(COLS + 1):
            pygame.draw.line(surface, GRID, (x * CELL, 60), (x * CELL, 60 + HEIGHT))
        for y in range(ROWS + 1):
            pygame.draw.line(surface, GRID, (0, 60 + y * CELL), (WIDTH, 60 + y * CELL))

    def draw_snake(self, surface):
        n = len(self.snake)
        for i, seg in enumerate(reversed(self.snake)):
            idx = n - 1 - i
            is_head = (idx == 0)
            t = 1 - idx / n
            r = int(10 + 34 * t)
            g = int(50 + 204 * t)
            b = 0
            color = (r, g, b) if not is_head else GREEN
            pad = 1 if is_head else 2
            rect = pygame.Rect(
                seg["x"] * CELL + pad,
                60 + seg["y"] * CELL + pad,
                CELL - pad * 2,
                CELL - pad * 2
            )
            pygame.draw.rect(surface, color, rect)

            if is_head:
                # Ojos
                dx, dy = self.direction
                ew = max(2, CELL // 8)
                if dx != 0:
                    ex = seg["x"] * CELL + (CELL * 3 // 5 if dx > 0 else CELL // 6)
                    ey1 = 60 + seg["y"] * CELL + CELL // 4
                    ey2 = 60 + seg["y"] * CELL + CELL * 3 // 5
                    pygame.draw.rect(surface, BLACK, (ex, ey1, ew, ew))
                    pygame.draw.rect(surface, BLACK, (ex, ey2, ew, ew))
                else:
                    ey = 60 + seg["y"] * CELL + (CELL * 3 // 5 if dy > 0 else CELL // 6)
                    ex1 = seg["x"] * CELL + CELL // 4
                    ex2 = seg["x"] * CELL + CELL * 3 // 5
                    pygame.draw.rect(surface, BLACK, (ex1, ey, ew, ew))
                    pygame.draw.rect(surface, BLACK, (ex2, ey, ew, ew))

    def draw_food(self, surface):
        pulse = 0.7 + 0.3 * abs(pygame.math.Vector2(1, 0).rotate(self.frame * 6).x)
        pad = 3
        rect = pygame.Rect(
            self.food[0] * CELL + pad,
            60 + self.food[1] * CELL + pad,
            CELL - pad * 2,
            CELL - pad * 2
        )
        # Glow
        glow_surf = pygame.Surface((CELL * 3, CELL * 3), pygame.SRCALPHA)
        pygame.draw.rect(glow_surf, (*RED, int(60 * pulse)),
                         (CELL, CELL, CELL, CELL), border_radius=4)
        surface.blit(glow_surf, (self.food[0] * CELL - CELL, 60 + self.food[1] * CELL - CELL))
        pygame.draw.rect(surface, RED, rect)

    def draw_bonus(self, surface):
        if not self.bonus:
            return
        cx = self.bonus[0] * CELL + CELL // 2
        cy = 60 + self.bonus[1] * CELL + CELL // 2
        r = int(CELL * 0.38)
        # Dibujar estrella de 5 puntas
        import math
        points = []
        for i in range(10):
            angle = math.radians(i * 36 - 90)
            radius = r if i % 2 == 0 else int(r * 0.45)
            points.append((cx + radius * math.cos(angle), cy + radius * math.sin(angle)))
        pygame.draw.polygon(surface, AMBER, points)
        # Barra de countdown
        frac = self.bonus_countdown / 80
        bar_w = int(CELL * frac)
        bar_rect = pygame.Rect(self.bonus[0] * CELL, 60 + self.bonus[1] * CELL + CELL - 3, bar_w, 3)
        pygame.draw.rect(surface, AMBER, bar_rect)

    def draw_particles(self, surface):
        for p in self.particles:
            p.draw(surface)

    def draw_hud(self, surface):
        # Fondo HUD
        pygame.draw.rect(surface, (0, 0, 0), (0, 0, WIDTH, 60))
        pygame.draw.line(surface, GREEN_DIM, (0, 59), (WIDTH, 59))

        score_txt  = font_small.render(f"PUNTAJE", True, GREEN_DIM)
        score_val  = font_med.render(f"{self.score:04}", True, GREEN)
        level_txt  = font_small.render(f"NIVEL", True, GREEN_DIM)
        level_val  = font_med.render(f"{self.level}", True, GREEN)
        high_txt   = font_small.render(f"RÉCORD", True, GREEN_DIM)
        high_val   = font_med.render(f"{self.high_score:04}", True, GREEN)

        # Columna izquierda
        surface.blit(score_txt, (10, 6))
        surface.blit(score_val, (10, 22))
        # Centro
        surface.blit(level_txt, (WIDTH // 2 - level_txt.get_width() // 2, 6))
        surface.blit(level_val, (WIDTH // 2 - level_val.get_width() // 2, 22))
        # Derecha
        surface.blit(high_txt, (WIDTH - high_txt.get_width() - 10, 6))
        surface.blit(high_val, (WIDTH - high_val.get_width() - 10, 22))

        # Mensaje de nivel
        if self.level_msg_timer > 0:
            msg = font_med.render(self.level_msg, True, AMBER)
            surface.blit(msg, (WIDTH // 2 - msg.get_width() // 2, HEIGHT + 60 - 24))

    def draw_overlay(self, surface, title, subtitle, extra=None, title_color=GREEN):
        overlay = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 220))
        surface.blit(overlay, (0, 60))

        t = font_big.render(title, True, title_color)
        surface.blit(t, (WIDTH // 2 - t.get_width() // 2, HEIGHT // 2 - 60 + 60))

        if extra:
            e = font_med.render(extra, True, GREEN)
            surface.blit(e, (WIDTH // 2 - e.get_width() // 2, HEIGHT // 2 - 20 + 60))

        # Parpadeo
        if (pygame.time.get_ticks() // 500) % 2 == 0:
            s = font_med.render(subtitle, True, AMBER)
            surface.blit(s, (WIDTH // 2 - s.get_width() // 2, HEIGHT // 2 + 20 + 60))

        hint = font_small.render("FLECHAS / WASD  |  ENTER: iniciar  |  P: pausa", True, GREEN_DIM)
        surface.blit(hint, (WIDTH // 2 - hint.get_width() // 2, HEIGHT // 2 + 55 + 60))

    def draw(self, surface):
        surface.fill(BG)
        self.draw_grid(surface)
        self.draw_particles(surface)
        self.draw_food(surface)
        self.draw_bonus(surface)
        self.draw_snake(surface)
        self.draw_hud(surface)

        if self.state == "menu":
            self.draw_overlay(surface, "VÍBORA", "PRESIONA ENTER")
        elif self.state == "paused":
            self.draw_overlay(surface, "PAUSA", "PRESIONA ENTER O P")
        elif self.state == "dead":
            self.draw_overlay(surface, "GAME OVER", "PRESIONA ENTER",
                              extra=f"PUNTAJE: {self.score:04}", title_color=RED)


# --- Loop principal ---
def main():
    game = SnakeGame()
    step_timer = 0

    while True:
        dt = clock.tick(FPS)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
                    if game.state in ("menu", "dead"):
                        game.reset()
                        game.state = "playing"
                        step_timer = 0
                    elif game.state == "playing":
                        game.state = "paused"
                    elif game.state == "paused":
                        game.state = "playing"

                elif event.key == pygame.K_p:
                    if game.state == "playing":
                        game.state = "paused"
                    elif game.state == "paused":
                        game.state = "playing"

                elif event.key in (pygame.K_UP, pygame.K_w):
                    if game.direction != (0, 1):
                        game.next_dir = (0, -1)
                elif event.key in (pygame.K_DOWN, pygame.K_s):
                    if game.direction != (0, -1):
                        game.next_dir = (0, 1)
                elif event.key in (pygame.K_LEFT, pygame.K_a):
                    if game.direction != (1, 0):
                        game.next_dir = (-1, 0)
                elif event.key in (pygame.K_RIGHT, pygame.K_d):
                    if game.direction != (-1, 0):
                        game.next_dir = (1, 0)

                elif event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()

        # Paso de la serpiente según velocidad
        if game.state == "playing":
            step_timer += dt
            if step_timer >= game.get_speed():
                step_timer = 0
                game.update()
            else:
                # Actualizar solo partículas y timers sin mover la serpiente
                for p in game.particles:
                    p.update()
                game.particles = [p for p in game.particles if p.life > 0]
                if game.level_msg_timer > 0:
                    game.level_msg_timer -= 1

        game.draw(screen)
        pygame.display.flip()


if __name__ == "__main__":
    main()
```

* Si pongo esto da un error si no tengo instalada la libreria

```cmd
python snake.py
```

* Da este error

```
ModuleNotFoundError: No module named 'pygame'
```

* Cuando python lanza un error se dice que lanza una **excepcion**
* Debemos instalar la libreria pygame
* Primero actualizamos el pip a la ultima version
```cmd
python.exe -m pip install --upgrade pip
```

* Luego
  
```cmd
pip install pygame
```

* Opcional (Si tenes la version 3.14.13 parece que anda con)

```cmd
pip install pygame-ce
```

* Para ver donde instala las librerias

```cmd
pip show pygame
```

> Asi como usamos el pip instala la libreria para rada la computadora. Es un problema cuando dos programas usan versiones distintas de la misma liberia. Trae conflicto. Por ese motivo en general se trabaja utilizando "entornos virtuales". La forma pro de trabajar con librerias en python que vamos a ver mas adelante

>  Es fundamental saber que librerias usar y para que sirven para saber darle un buen prompt a la IA - Matias
