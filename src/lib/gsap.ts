'use client';

import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, InertiaPlugin);
gsap.defaults({ ease: 'expo.out', duration: 0.8 });

export { gsap, Draggable, ScrollTrigger, useGSAP };
