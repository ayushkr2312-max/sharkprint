'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// GSAP with ScrollTrigger only: what smooth scrolling and /overview need. The main site's
// drag plugins live in lib/gsap.ts, so pages that don't drag don't download them.
gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: 'expo.out', duration: 0.8 });

export { gsap, ScrollTrigger, useGSAP };
