
import { Columns2, Facebook, Frame, Framer, Image, Link2, PanelTop, Projector, RectangleEllipsis, SquareSplitVertical, Text, TextSelectionIcon, Twitter } from "lucide-react";


export default [
  {
    icon: RectangleEllipsis,
    label: 'Button',
    type: 'Button',
    content: 'Sample Button',
    url: '#',
    style: {
      textAlign: 'center',
      backgroundColor: '#007bff',
      color: '#ffffff',
      padding: '10px',
      width: 'auto',
      fontSize: '16px',
      borderRadius: '0px',
      fontWeight: 'normal',
      objectFit: 'contain',

    },
    outerStyle: {
      display: 'flex', // Keep display flex
      justifyContent: 'center', // Default horizontal alignment
      alignItems: 'center', // Default vertical alignment
      width: '100%',
      backgroundColor: '#ffffff'
    }
  },
  {
    icon: TextSelectionIcon,
    type: 'Text',
    label: 'Text',
    textarea: 'Sample Text',
    style: {
      backgroundColor: '#fff',
      color: '#000000',
      padding: '10px',
      textAlign: 'center',
      fontSize: '22px',
      fontWeight: 'normal',
      textTransform: 'uppercase'//lowercase , capitilized
    },
    outerStyle: {
      display: 'flex', // Add display flex
      justifyContent: 'center', // Default horizontal alignment
      alignItems: 'center', // Default vertical alignment
      backgroundColor: '#fff',
      width: '100%'
    }
  },
  {
    icon: Image,
    type: 'Image',
    label: 'Image',
    imageUrl: "/logo.png",
    alt: 'Image',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '50%',
      width: '70%',
      margin: '0px',
      borderRadius: '0px'
    },
    outerStyle: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center', // Default horizontal alignment
      alignItems: 'center', // Default vertical alignment
      backgroundColor: '#fff'
    }
  },
  {
    icon: Frame,
    type: 'Logo',
    label: 'Logo',
    imageUrl: "/next.svg",
    alt: 'logo',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '30%',
      width: '30%',
    },
    outerStyle: {
      display: 'flex',
      justifyContent: 'center', // Default horizontal alignment
      alignItems: 'center', // Default vertical alignment
      backgroundColor: '#fff',
      width: '100%'
    }
  },
  {
    icon: PanelTop,
    type: 'LogoHeader',
    label: 'Logo Header',
    imageUrl: "/logo.svg",
    alt: 'logo',
    url: '#',
    style: {
      backgroundColor: '#ffffff',
      padding: '10px',
      height: '40%',
      width: '40%',
    },
    outerStyle: {
      display: 'flex',
      justifyContent: 'flex-start', // Changed 'left' to 'flex-start'
      alignItems: 'center', // Default vertical alignment
      backgroundColor: '#fff',
      width: '100%'
    }
  },
  {
    icon: SquareSplitVertical,
    type: 'Divider',
    label: 'Divider',
    content: '',
    style: {
      color: '#000000',
      padding: '10px',
      width: '100%'
    }
  },
  {
    type: 'SocialIcons',
    icon: Twitter,
    label: 'Social Icons',
    socialIcons: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
        url: ''
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968852.png',
        url: ''
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968756.png',
        url: ''
      }
    ],
    options: [
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111463.png',
        url: ''
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968852.png',
        url: ''
      },
      {
        icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968756.png',
        url: ''
      }
    ],
    style: {
      width: 40,
      height: 40
    },
    outerStyle: {
      display: 'flex',
      gap: 15,

    }



  }

]
