
import { Project, Service, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Tattoo Studio Website',
    description: 'A dynamic website featuring an interactive portfolio and seamless booking functionality.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQhCx29weTVwvuK54xp1MDyuvUWDsV6EAbS1VjahhpOlxqCLrhNU53EHej-9UhAcbrsNZA4o6vRl9V4_iqdFcqTyaLUoGEBXO3r3twOIUcbPhXTcBB_YiPadgFRQynol0HdP6v_xSAE6Hm3wHYJR-yBrb-aAZq7X9CHo6NhSCjpircsuHSSqE87BD7hUEUnj0udRR-uodOCcu1j4dadp3Q0VcpSstXBO7qyR2WpJbRvASM1m0sIcNy2cr9eQrd-UnUtfPFFt2Jiwca',
    category: 'Web Design'
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'An interactive personal portfolio showcasing creative work with advanced animations.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVIV0RqyS64L7D_4N1EtZ5BX8elwon4BC1Y8s1LYYRqhKnmh6K979tX7b99ikZVz_OR521DRvns6T-PVtzwEVcza302EQuicNlSZI1KGetE0B0J2Zdza05nRVrW_TNGERKDwBqBdC49E2j2y5F9dUCTWyvc8imNTqB0dV7pf61lbdaGEvYNYHMW5k08-PZIJtnnj6OPvpwAbd_z9rbwXR-QpcodDtT5dYwi2KpsVLdJxpKe91lpIiqy1FpcU_41a_baOKyQia-oR-F',
    category: 'Creative Design'
  },
  {
    id: '3',
    title: 'Furniture Store',
    description: 'A minimalist e-commerce platform with unique product visualization features.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQFYVNZG-yyCm4G3kIt3NmXhi7dTzhYlIAI8pcmN09t8EifvXSB3ooBldLg-9Zfmk1yomByIx1VDVyqK82ZWZ0cvZbXCBvDAtAsDtOMSnl8sIz8S9fdKGcBk7iOVbYqDS330txrCSWsL2S551SkB5sO_RtU_Ksmq9opqjVScxh1xX2Hbk_24abFk1SJa5rr8k2nXENgd9IroOUM35xH8QviaTVnohOlgQ7iUcwYTeYQmDgAI-0jeKz4547EtQgFqYdDFRy9mtGWqXL',
    category: 'E-commerce'
  },
  {
    id: '4',
    title: 'Foundation Website',
    description: 'A non-profit website featuring donation campaigns and community programs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_hhEPB7e8bfBo6G7CXyZ3aHQ_m5-urz1iDiRp9-H69yLenx784uSUYiaxXvjC_0rZbfo0qU66hB6zjqWD2zKUzq78N0zclD-BCGNXFXoakb1bkaMMDoVwnJg0nHDzKp19MhUJ-3EGzEsHRHmvwIQ1m-ZdDTyBoLOQW1grB5YyG9RyLXhGfoWrDcQVu6CjAU9XrCB66QW3v3KvWi7HBG4lzrXnCVJ6dKu9f8zilLtdjV_pPKmyGqfmllqgyiBlEoDcTlewHTSUxSCd',
    category: 'Web Design'
  },
  {
    id: '5',
    title: 'Tech Blog Platform',
    description: 'A modern blog platform featuring dynamic content and responsive design.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBh8Y7T7rv96bkE5f_6Zmquz-S9QspOqEJ8WMh1bVzkATyg6PrKGEUxKFG-d2SpFtqwH5fKC9WJnXMX8DYW4hlDgMKTHcBL7wcwMJqI8HXgZXJZdYYUA2KG-FkKZ12ds5Pf2VZM0rHsRC-nQqf1Nc7MBi0C3drBb50_EDY4QR6a2MmOdxfOrOUagkToKr1Rn6LMlJSBEMt6t55IfYMXYzRtlooY50De0Jwv0XPhPN4FkSrH-FjApW8fIzD6zbAQts8cIJYb6OOQsO7',
    category: 'Platform Development'
  },
  {
    id: '6',
    title: 'Corporate Website',
    description: 'A professional corporate website with sleek design and intuitive navigation.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfhtcO1g8RV7sMptSgJNwCRibst7WoDs7tq4qO0AkjrrQGMRceSJK-vasfzNIljQQYIsxlhBJlvAlC7YuTnRnLfuJgRrMabaCL9u9OB3JLuwnG6tsgoN-OS99DAXn7hjMtkBnw6mZJDDIulk81YU1FNQ5zuHXNqal1sNj5q6b83u11PUyWMPJKf5ZmT_PMVQ8-RrGH9aj8Mu_HfobB2vFi7WfGuvrTsJ7CYu39j-x6hkdhsp1NJryu13KACke_MGlfvyMv-P4lj52Z',
    category: 'Corporate'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Web Design & Development',
    description: 'Custom, responsive websites optimized for performance and user experience, tailored for your business needs.',
    icon: 'desktop_windows',
    link: '#'
  },
  {
    id: 's2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform applications using technologies like React Native and Flutter.',
    icon: 'smartphone',
    link: '#'
  },
  {
    id: 's3',
    title: 'UI/UX Design',
    description: 'User-centric designs that enhance engagement and usability, creating seamless digital experiences.',
    icon: 'design_services',
    link: '#'
  },
  {
    id: 's4',
    title: 'Brand Identity & Strategy',
    description: 'Comprehensive branding services, including logo design and market positioning strategies.',
    icon: 'branding_watermark',
    link: '#'
  },
  {
    id: 's5',
    title: 'Design & Animation',
    description: 'Custom animations and visual designs to elevate your brand storytelling and engagement.',
    icon: 'layers',
    link: '#'
  },
  {
    id: 's6',
    title: 'SEO Optimization',
    description: 'Strategic optimization to improve search engine rankings and enhance your online visibility.',
    icon: 'search',
    link: '#'
  }
];
