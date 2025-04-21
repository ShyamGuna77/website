/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: ReactNode;
  imgSrc: any;
  tech: string[];
  github: string;
  live: string;
}