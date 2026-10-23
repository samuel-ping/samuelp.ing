import {
  GemIcon,
  HomeServerIcon,
  PlantsIcon,
  Printer3DIcon,
  RunningIcon,
  TennisIcon,
} from '@/components/ui/icons';

/**
 * `label` is kept as the accessible name for the row; the icon stands in for it
 * visually.
 */
const NowItems = [
  {
    label: 'Tennis',
    icon: TennisIcon,
    text: 'Grinding groundstrokes at Astoria Park (usually), but currently resting due to a wrist injury 🤕',
  },
    {
    label: 'Home server',
    icon: HomeServerIcon,
    text: 'Tinkering with [my home server](/projects/home-server) and finding new services to host',
  },
  {
    label: 'Running',
    icon: RunningIcon,
    text: 'Jogging around Gantry Park (the best park) with my friends',
  },
  {
    label: 'Plants',
    icon: PlantsIcon,
    text: 'Quenching the thirst of my parched monstera thai constellation...',
  },
  {
    label: '3D printing',
    icon: Printer3DIcon,
    text: 'Re-levelling my 3d printer for the thousandth time (just to print more spaghetti again yum)',
  },
  {
    label: 'Spotting items on the ground',
    icon: GemIcon,
    text: 'Spotting and taking home treasure (others may disagree) from the ground'
  }
];

export default NowItems;
