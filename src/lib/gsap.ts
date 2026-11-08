'use client';

import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-core';

// The core, plus the drag plugins the main site's rails use.
gsap.registerPlugin(Draggable, InertiaPlugin);

export { gsap, Draggable, ScrollTrigger, useGSAP };
