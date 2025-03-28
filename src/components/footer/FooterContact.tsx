
import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const FooterContact: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
      <ul className="space-y-3">
        <li>
          <a 
            href="mailto:sanathkumar.data@gmail.com" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <Mail className="h-5 w-5 mr-2" />
            sanathkumar.data@gmail.com
          </a>
        </li>
        <li>
          <div className="flex space-x-4">
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 mr-2" />
              <span>GitHub</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;
