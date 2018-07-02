#!/usr/bin/env python2

from numpy import cos, sin, pi, arctan2, sqrt, square, int, linspace, any, all, array
from numpy.random import random as random
import numpy as np
import cairo
from time import time as time
from operator import itemgetter
from numpy.random import normal as normal

NMAX = 2 * 1e7
SIZE = 15000
ONE = 1. / SIZE

RAD = 40. * ONE

ZONEWIDTH = 2. * (RAD / ONE)

ZONES = int(SIZE / ZONEWIDTH)

BACK = 1.
FRONT = 0.
MID = 0.5

X_MIN = 0. + 10. * ONE # border
Y_MIN = 0. + 10. * ONE
X_MAX = 1. - 10. * ONE
Y_MAX = 1. - 10. * ONE

filename = 'generated'
DRAW_SKIP = 10000 # write image this often

RAD_SCALE = 0.92
SEARCH_ANGLE_MAX = pi

R_RAND_SIZE = 6
CK_MAX = 15 # max number of allowed branch attempts from a node

CIRCLE_RADIUS = 0.45

SOURCE_NUM = 9

ALPHA = 0.09
GRAINS = 10

INIT_CIRCLE = 0.45

print
print 'filename', filename
print 'SIZE', SIZE
print 'ZONEWIDTH', ZONEWIDTH
print 'RAD', RAD
print 'ZONES', ZONES
print 'one', ONE

class Render(object):
  def __init__(self, n):
    sur = cairo.ImageSurface(cairo.FORMAT_ARGB32, n, n)
    ctx = cairo.Context(sur)
    ctx.scale(n, n)
    ctx.set_source_rgb(BACK, BACK, BACK)
    ctx.rectangle(0, 0, 1, 1)
    ctx.fill()

    self.sur = sur
    self.ctx = ctx

    self.colors = ((0, 0, 0))
    self.ncolors = 1

  def get_colors(self, f):
    import Image
    from random import shuffle

    scale = 1. / 255.
    im = Image.open(f)
    w,h = im.size
    rgbim = im.convert('RGB')
    res = []
    for i in xrange(0, w):
      for j in xrange(0, h):
        r,g,b = rgbim.getpixel((i, j))
        res.append((r * scale, g * scale, b * scale))

    shuffle(res)

    self.colors = res
    self.ncolors = len(res)

  def line(self, x1, y1, x2, y2):
    self.ctx.move_to(x1, y1)
    self.ctx.line_to(x2, y2)
    self.ctx.stroke()

  def circle(self, x, y, r):
    self.ctx.arc(x, y, r, 0, pi * 2.)
    self.ctx.stroke()

  def circle_fill(self, x, y, r):
    self.ctx.arc(x, y, r, 0, pi * 2.)
    self.ctx.fill()

  def circles(self, x1, y1, x2, y2, r):
    dx = x1 - x2
    dy = y1 - y2
    dd = sqrt(dx * dx + dy * dy)
    n = int(dd / ONE)
    n = n if n > 6 else 6
    a = arctan2(dy, dx)
    scale = linspace(0, dd, n)

    xp = x1 - scale * cos(a)
    yp = y1 - scale * sin(a)

    for x, y in zip(xp, yp):
      self.ctx.arc(x, y, r, 0, pi * 2.)
      self.ctx.fill()

  def sandpaint_line(self, x1, y1, x2, y2, r):
    dx = x1 - x2
    dy = y1 - y2
    a = arctan2(dy, dx)
    dots = 2 * int(r * SIZE)
    scales = linspace(0, r, dots)
    xp = x1 - scales * cos(a) + random(dots) * ONE * LINE_NOISE
    yp = y1 - scales * sin(a) + random(dots) * ONE * LINE_NOISE

    self.ctx.set_source_rgba(FRONT, FRONT, FRONT)

    for x, y in zip(xp, yp):
      self.ctx.rectangle(x, y, ONE, ONE)
      self.ctx.fill()

  def sandpaint_color_line(self, x1, y1, x2, y2, k):
    dx = x1 - x2
    dy = y1 - y2
    dd = sqrt(dx * dx + dy * dy)
    a = arctan2(dy, dx)
    scales = random(GRAINS) * dd
    xp = x1 - scales * cos(a)
    yp = y1 - scales * sin(a)

    r, g, b = self.colors[k % self.ncolors]
    self.ctx.set_source_rgba(r, g, b, ALPHA)

    for x, y in zip(xp, yp):
      self.ctx.rectangle(x, y, ONE, ONE)
      self.ctx.fill()

def near_zone_inds(x, y, Z):
  i = 1 + int(x * ZONES)
  j = 1 + int(y * ZONES)
  ij = np.array([i - 1, i ,i + 1, i - 1, i, i + 1, i - 1, i, i + 1]) * ZONES + \
       np.array([j + 1, j + 1, j + 1, j, j, j, j - 1, j - 1, j - 1])

  it = itemgetter(*ij)
  its = it(Z)
  inds = [b for a in its for b in a]

  return inds

def get_z(x, y):
  i = 1 + int(x * ZONES)
  j = 1 + int(y * ZONES)
  z = i * ZONES + j
  return z

def main():
  render = Render(SIZE)
  Z = [[] for i in xrange((ZONES +2 ) ** 2)]
  R = np.zeros(int(NMAX), 'float')
  X = np.zeros(int(NMAX), 'float')
  Y = np.zeros(int(NMAX), 'float')
  THE = np.zeros(int(NMAX), 'float')
  GE = np.zeros(int(NMAX), 'float')
  P = np.zeros(int(NMAX), 'int')
  C = np.zeros(int(NMAX), 'int')
  D = np.zeros(int(NMAX), 'int') - 1

  i = 0 # number of nodes

  # initialize source nodes
  while i < SOURCE_NUM:
    # in circle
    x = random()
    y = random()
    if sqrt(square(x - 0.5) + square(y - 0.5)) < INIT_CIRCLE:
      X[i] = x
      Y[i] = y
      R[i] = (RAD + 0.2 * RAD * (1. - 2. * random()))
      P[i] = -1
    else:
      continue

    THE[i] = random() * pi * 2.
    GE[i] = 1
    P[i] = -1 # no parent
    R[i] = RAD
    z = get_z(X[i], Y[i])
    Z[z].append(i)
    i += 1

  num = i
  itt = 0
  ti = time()
  drawn = -1

  while True:
    try:
      itt += 1
      if not itt % 1000:
        print itt, num, filename

      added_new = False

      k = int(random()*num)
      C[k] += 1

      if C[k] > CK_MAX:
        continue # node is dead

      r = R[k] * RAD_SCALE if D[k] > -1 else R[k]

      if r < ONE:
        C[k] = CK_MAX + 1 # node dies
        continue

      ge = GE[k] + 1 if D[k] > -1 else GE[k]
      the = THE[k] + (1. -1. / ((ge + 1) ** 0.1)) * normal() * SEARCH_ANGLE_MAX

      x = X[k] + sin(the) * r
      y = Y[k] + cos(the) * r

      # stop nodes at edge of circle, remember to set initial node inside circle.
      circle_rad = sqrt(square(x - 0.5) + square(y - 0.5))
      if circle_rad > CIRCLE_RADIUS:
        # node is outside circle
        continue

      try:
        inds = near_zone_inds(x, y, Z)
        inds = array([a for a in inds if not a == k and not a == P[k]])

      except IndexError:
        # node is outside zonemapped area
        continue

      good = True
      if len(inds) > 0:
        dd = square(X[inds] - x) + square(Y[inds] - y)
        sqrt(dd, dd)
        mask = dd * 2 > R[inds] + r
        good = mask.all()

      if good:
        X[num] = x
        Y[num] = y
        R[num] = r
        THE[num] = the
        P[num] = k
        GE[num] = ge

        if D[k]<0: D[k] = num

        z = get_z(x,y)

        Z[z].append(num)

        render.ctx.set_source_rgb(FRONT,FRONT,FRONT)
        render.circles(X[k], Y[k], x, y, r * 0.35)

        num += 1
        added_new = True

        if not num % DRAW_SKIP and added_new:
          render.sur.write_to_png('{:s}.{:d}.png'.format(filename, num))
          print itt, num, time()-ti
          ti = time()
          drawn = num

      else:
        pass
    except KeyboardInterrupt:
      break

  return

if __name__ == '__main__':
    main()
