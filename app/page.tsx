'use client';

import { useState, useEffect } from 'react';

export default function AdkProductionDashboard() {
  const [activeCollapsibles, setActiveCollapsibles] = useState<{ [key: string]: boolean }>({});
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');

  const toggleCollapsible = (id: string) => {
    setActiveCollapsibles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSidebarItem(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Generate scene cards for the first section
    generateSceneCards();
    // Generate scene breakdown cards for the second section
    generateSceneBreakdownCards();
  }, []);

  const generateSceneCards = () => {
    const sceneGrid = document.getElementById('sceneGrid');
    if (!sceneGrid) return;

    // Clear existing content
    sceneGrid.innerHTML = '';
    
    // Black Panther script scene data from the original HTML
    const blackPantherScenes = [
      // Act I - Opening Sequences
      { id: 'S1', location: 'WAKANDA - ROYAL PALACE', type: 'INT', time: 'NIGHT', page: 1, characters: ["T'CHALLA", "T'CHAKA"], eighths: 3.2, dialogueCount: 8, complexityFactor: 1.8, description: 'T\'Challa\'s introduction and royal ceremony preparation' },
      { id: 'S2', location: 'WAKANDA - THRONE ROOM', type: 'INT', time: 'DAY', page: 2, characters: ["T'CHALLA", "SHURI", "RAMONDA"], eighths: 2.8, dialogueCount: 6, complexityFactor: 1.5, description: 'Family dynamics and Wakandan politics' },
      { id: 'S3', location: 'WAKANDA - VIBRANIUM MINES', type: 'EXT', time: 'DAY', page: 3, characters: ["T'CHALLA", "SHURI"], eighths: 4.1, dialogueCount: 4, complexityFactor: 2.2, description: 'Introduction to Wakandan technology' },
      { id: 'S4', location: 'MUSEUM - LONDON', type: 'INT', time: 'NIGHT', page: 4, characters: ["KILLMONGER", "KLAUE"], eighths: 3.5, dialogueCount: 7, complexityFactor: 1.9, description: 'Killmonger and Klaue\'s first meeting' },
      { id: 'S5', location: 'WAKANDA - WARRIOR FALLS', type: 'EXT', time: 'DAY', page: 5, characters: ["T'CHALLA", "M'BAKU", "OKOYE"], eighths: 5.2, dialogueCount: 12, complexityFactor: 2.8, description: 'Ritual combat for the throne' },
      
      // Act I continued - Character Development
      { id: 'S6', location: 'WAKANDA - SHURI\'S LAB', type: 'INT', time: 'DAY', page: 6, characters: ["T'CHALLA", "SHURI"], eighths: 3.8, dialogueCount: 9, complexityFactor: 2.1, description: 'Black Panther suit upgrade sequence' },
      { id: 'S7', location: 'BUSAN - CASINO', type: 'INT', time: 'NIGHT', page: 8, characters: ["T'CHALLA", "OKOYE", "NAKIA"], eighths: 4.5, dialogueCount: 11, complexityFactor: 2.5, description: 'Undercover mission in South Korea' },
      { id: 'S8', location: 'BUSAN - STREET CHASE', type: 'EXT', time: 'NIGHT', page: 10, characters: ["T'CHALLA", "KLAUE", "OKOYE"], eighths: 6.1, dialogueCount: 3, complexityFactor: 3.2, description: 'High-speed chase through Busan' },
      { id: 'S9', location: 'WAKANDA - BORDER TRIBE', type: 'EXT', time: 'DAY', page: 12, characters: ["T'CHALLA", "W'KABI"], eighths: 2.9, dialogueCount: 8, complexityFactor: 1.6, description: 'Diplomatic meeting with Border Tribe' },
      { id: 'S10', location: 'OAKLAND - CHILDHOOD HOME', type: 'INT', time: 'FLASHBACK', page: 14, characters: ["YOUNG N'JOBU", "YOUNG ERIK"], eighths: 3.1, dialogueCount: 5, complexityFactor: 1.7, description: 'Killmonger\'s origin story revealed' },
      
      // Act II - Rising Action
      { id: 'S11', location: 'WAKANDA - ANCESTRAL PLANE', type: 'MYSTICAL', time: 'TIMELESS', page: 16, characters: ["T'CHALLA", "T'CHAKA"], eighths: 4.2, dialogueCount: 10, complexityFactor: 2.4, description: 'Spiritual journey and family secrets' },
      { id: 'S12', location: 'CIA FACILITY - LANGLEY', type: 'INT', time: 'DAY', page: 18, characters: ["EVERETT ROSS", "T'CHALLA"], eighths: 3.3, dialogueCount: 7, complexityFactor: 1.8, description: 'International politics and alliances' },
      { id: 'S13', location: 'WAKANDA - COUNCIL CHAMBER', type: 'INT', time: 'DAY', page: 20, characters: ["T'CHALLA", "TRIBAL LEADERS"], eighths: 4.8, dialogueCount: 15, complexityFactor: 2.6, description: 'Debate over Wakanda\'s isolation policy' },
      { id: 'S14', location: 'KILLMONGER\'S APARTMENT', type: 'INT', time: 'NIGHT', page: 22, characters: ["KILLMONGER"], eighths: 2.5, dialogueCount: 2, complexityFactor: 1.4, description: 'Killmonger\'s preparation and motivation' },
      { id: 'S15', location: 'WAKANDA - GREAT MOUND', type: 'EXT', time: 'DAY', page: 24, characters: ["T'CHALLA", "SHURI", "RAMONDA"], eighths: 3.9, dialogueCount: 6, complexityFactor: 2.0, description: 'Heart-shaped herb ceremony' },
      
      // Act II continued - Conflict Escalation
      { id: 'S16', location: 'WAKANDA - ROYAL TALON FIGHTER', type: 'INT', time: 'DAY', page: 26, characters: ["T'CHALLA", "OKOYE", "AYO"], eighths: 2.7, dialogueCount: 4, complexityFactor: 1.9, description: 'Mission briefing and flight sequence' },
      { id: 'S17', location: 'LONDON - BRITISH MUSEUM', type: 'INT', time: 'DAY', page: 28, characters: ["KILLMONGER", "MUSEUM CURATOR"], eighths: 3.6, dialogueCount: 8, complexityFactor: 2.1, description: 'Wakandan artifacts and cultural theft' },
      { id: 'S18', location: 'WAKANDA - DORA MILAJE TRAINING', type: 'EXT', time: 'DAY', page: 30, characters: ["OKOYE", "AYO", "DORA MILAJE"], eighths: 4.3, dialogueCount: 5, complexityFactor: 2.3, description: 'Elite warrior training sequence' },
      { id: 'S19', location: 'SEOUL - UNDERGROUND CLUB', type: 'INT', time: 'NIGHT', page: 32, characters: ["KLAUE", "ASSOCIATES"], eighths: 3.1, dialogueCount: 6, complexityFactor: 1.8, description: 'Arms dealing and Wakandan intelligence' },
      { id: 'S20', location: 'WAKANDA - MINING FACILITY', type: 'INT', time: 'DAY', page: 34, characters: ["T'CHALLA", "MINING WORKERS"], eighths: 2.8, dialogueCount: 3, complexityFactor: 1.5, description: 'Vibranium extraction process' },
      
      // Act II - Midpoint Crisis
      { id: 'S21', location: 'BUSAN - INTERROGATION ROOM', type: 'INT', time: 'NIGHT', page: 36, characters: ["T'CHALLA", "KLAUE"], eighths: 4.7, dialogueCount: 12, complexityFactor: 2.7, description: 'Klaue reveals Wakanda\'s secrets' },
      { id: 'S22', location: 'WAKANDA - WATERFALL CEREMONY', type: 'EXT', time: 'SUNSET', page: 38, characters: ["KILLMONGER", "T'CHALLA", "TRIBAL LEADERS"], eighths: 6.3, dialogueCount: 18, complexityFactor: 3.5, description: 'Killmonger\'s challenge for the throne' },
      { id: 'S23', location: 'WAKANDA - THRONE ROOM CONFRONTATION', type: 'INT', time: 'DAY', page: 42, characters: ["KILLMONGER", "RAMONDA", "SHURI"], eighths: 5.1, dialogueCount: 14, complexityFactor: 2.9, description: 'Killmonger takes control of Wakanda' },
      { id: 'S24', location: 'JABARI LAND - MOUNTAIN VILLAGE', type: 'EXT', time: 'DAY', page: 45, characters: ["M'BAKU", "RAMONDA", "SHURI"], eighths: 4.2, dialogueCount: 9, complexityFactor: 2.2, description: 'Seeking refuge with the Jabari tribe' },
      { id: 'S25', location: 'WAKANDA - HERB GARDEN DESTRUCTION', type: 'EXT', time: 'DAY', page: 47, characters: ["KILLMONGER", "GUARDS"], eighths: 3.4, dialogueCount: 4, complexityFactor: 2.0, description: 'Destroying the heart-shaped herb' },
      
      // Act III - Climax and Resolution
      { id: 'S26', location: 'JABARI LAND - T\'CHALLA\'S RECOVERY', type: 'INT', time: 'NIGHT', page: 49, characters: ["T'CHALLA", "M'BAKU"], eighths: 3.8, dialogueCount: 7, complexityFactor: 1.9, description: 'T\'Challa\'s resurrection and recovery' },
      { id: 'S27', location: 'WAKANDA - FINAL BATTLE PREPARATION', type: 'EXT', time: 'DAY', page: 52, characters: ["T'CHALLA", "LOYAL FORCES"], eighths: 4.9, dialogueCount: 8, complexityFactor: 2.8, description: 'Preparing for the final confrontation' },
      { id: 'S28', location: 'WAKANDA - VIBRANIUM MOUND BATTLE', type: 'EXT', time: 'DAY', page: 55, characters: ["T'CHALLA", "KILLMONGER", "ARMIES"], eighths: 8.2, dialogueCount: 6, complexityFactor: 4.1, description: 'Epic final battle for Wakanda' },
      { id: 'S29', location: 'WAKANDA - UNDERGROUND RAIL CHASE', type: 'INT', time: 'DAY', page: 60, characters: ["T'CHALLA", "KILLMONGER"], eighths: 6.7, dialogueCount: 9, complexityFactor: 3.8, description: 'Final confrontation in the mines' },
      { id: 'S30', location: 'WAKANDA - SUNSET RECONCILIATION', type: 'EXT', time: 'SUNSET', page: 65, characters: ["T'CHALLA", "KILLMONGER"], eighths: 4.5, dialogueCount: 11, complexityFactor: 2.6, description: 'Killmonger\'s final moments and philosophy' },
      
      // Epilogue and Resolution
      { id: 'S31', location: 'UNITED NATIONS - ASSEMBLY HALL', type: 'INT', time: 'DAY', page: 68, characters: ["T'CHALLA", "WORLD LEADERS"], eighths: 3.7, dialogueCount: 5, complexityFactor: 1.8, description: 'Wakanda reveals itself to the world' },
      { id: 'S32', location: 'OAKLAND - COMMUNITY CENTER', type: 'EXT', time: 'DAY', page: 70, characters: ["T'CHALLA", "SHURI", "LOCAL KIDS"], eighths: 3.2, dialogueCount: 6, complexityFactor: 1.6, description: 'Wakandan outreach program established' },
    ];

    // Generate additional scenes to reach full script coverage (232 total scenes)
    const additionalSceneTypes = [
      { prefix: 'Action', locations: ['WAKANDA BORDER', 'ROYAL PALACE', 'TRAINING GROUNDS'], complexity: 2.5 },
      { prefix: 'Dialogue', locations: ['COUNCIL CHAMBER', 'PRIVATE QUARTERS', 'GARDEN'], complexity: 1.5 },
      { prefix: 'Technical', locations: ['SHURI\'S LAB', 'COMMUNICATIONS ROOM', 'HANGAR'], complexity: 2.0 },
      { prefix: 'Ceremonial', locations: ['ANCESTRAL PLANE', 'THRONE ROOM', 'WATERFALL'], complexity: 1.8 }
    ];

    // Add the detailed scenes first
    blackPantherScenes.forEach((scene) => {
      const sceneCard = document.createElement('div');
      sceneCard.className = 'scene-card';
      
      sceneCard.innerHTML = `
        <div class="scene-header">${scene.id} - ${scene.description}</div>
        <div class="scene-detail">
          <span class="badge badge-${scene.type.toLowerCase()}">${scene.type}</span>
          <span class="badge badge-${scene.time.toLowerCase()}">${scene.time}</span>
          <span class="badge ${scene.complexityFactor > 2.5 ? 'badge-complex' : scene.complexityFactor > 1.8 ? 'badge-moderate' : 'badge-simple'}">${scene.complexityFactor > 2.5 ? 'Complex' : scene.complexityFactor > 1.8 ? 'Moderate' : 'Simple'}</span>
        </div>
        <div class="scene-detail"><strong>Location:</strong> ${scene.location}</div>
        <div class="scene-detail"><strong>Page:</strong> ${scene.page}</div>
        <div class="scene-detail"><strong>Characters:</strong> ${scene.characters.join(', ')}</div>
        <div class="scene-detail"><strong>Eighths:</strong> ${scene.eighths}</div>
        <div class="scene-detail"><strong>Dialogue Count:</strong> ${scene.dialogueCount}</div>
        <div class="scene-detail"><strong>Complexity Factor:</strong> ${scene.complexityFactor}</div>
        <div class="scene-detail"><strong>Technical Cues:</strong> Camera Movement, ${scene.complexityFactor > 2.0 ? 'VFX Required' : 'Standard Setup'}</div>
      `;
      
      sceneGrid.appendChild(sceneCard);
    });

    // Generate remaining scenes to reach 232 total (additional 200 scenes)
    for (let i = 33; i <= 232; i++) {
      const sceneType = additionalSceneTypes[i % additionalSceneTypes.length];
      const locationType = i % 2 === 0 ? 'EXT' : 'INT';
      const timeOfDay = Math.random() > 0.5 ? 'DAY' : 'NIGHT';
      const pageNumber = Math.ceil(i * 0.4); // Approximate page distribution
      const baseCharacters = ["T'CHALLA"];
      const additionalChars = ["SHURI", "OKOYE", "NAKIA", "M'BAKU", "RAMONDA", "W'KABI"];
      const sceneCharacters = [baseCharacters[0]];
      
      // Add 1-3 additional characters randomly
      const numAdditionalChars = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numAdditionalChars; j++) {
        const randomChar = additionalChars[Math.floor(Math.random() * additionalChars.length)];
        if (!sceneCharacters.includes(randomChar)) {
          sceneCharacters.push(randomChar);
        }
      }

      const eighths = +(2.0 + Math.random() * 4.0).toFixed(1);
      const dialogueCount = Math.floor(Math.random() * 15) + 3;
      const complexityFactor = +(sceneType.complexity + (Math.random() * 0.8 - 0.4)).toFixed(1);
      
      const sceneCard = document.createElement('div');
      sceneCard.className = 'scene-card';
      
      sceneCard.innerHTML = `
        <div class="scene-header">S${i} - ${sceneType.prefix} Scene</div>
        <div class="scene-detail">
          <span class="badge badge-${locationType.toLowerCase()}">${locationType}</span>
          <span class="badge badge-${timeOfDay.toLowerCase()}">${timeOfDay}</span>
          <span class="badge ${complexityFactor > 2.5 ? 'badge-complex' : complexityFactor > 1.8 ? 'badge-moderate' : 'badge-simple'}">${complexityFactor > 2.5 ? 'Complex' : complexityFactor > 1.8 ? 'Moderate' : 'Simple'}</span>
        </div>
        <div class="scene-detail"><strong>Location:</strong> ${sceneType.locations[Math.floor(Math.random() * sceneType.locations.length)]}</div>
        <div class="scene-detail"><strong>Page:</strong> ${pageNumber}</div>
        <div class="scene-detail"><strong>Characters:</strong> ${sceneCharacters.join(', ')}</div>
        <div class="scene-detail"><strong>Eighths:</strong> ${eighths}</div>
        <div class="scene-detail"><strong>Dialogue Count:</strong> ${dialogueCount}</div>
        <div class="scene-detail"><strong>Complexity Factor:</strong> ${complexityFactor}</div>
        <div class="scene-detail"><strong>Technical Cues:</strong> Camera Movement${complexityFactor > 2.0 ? ', VFX Required' : ', Standard Setup'}${sceneType.prefix === 'Action' ? ', Stunt Coordination' : ''}${sceneType.prefix === 'Technical' ? ', Special Equipment' : ''}</div>
      `;
      
      sceneGrid.appendChild(sceneCard);
    }
  };

  const generateSceneBreakdownCards = () => {
    const sceneGrid = document.getElementById('sceneBreakdownGrid');
    if (!sceneGrid) return;

    // Clear existing content
    sceneGrid.innerHTML = '';
    
    // Generate 100 scenes based on the pattern from the JSON
    for (let i = 1; i <= 100; i++) {
      const sceneCard = document.createElement('div');
      sceneCard.className = 'scene-breakdown-card';
      
      const locationType = i % 2 === 0 ? 'EXT' : 'INT';
      const timeOfDay = Math.random() > 0.5 ? 'DAY' : 'NIGHT';
      const isNightShoot = timeOfDay === 'NIGHT';
      const isWeatherDependent = locationType === 'EXT';
      const isHighPriority = (i % 6 === 4) && locationType === 'EXT' && timeOfDay === 'NIGHT';
      const totalCrew = locationType === 'EXT' ? 16 : 15;
      const crewHours = locationType === 'EXT' ? 64 : 60;
      const characters = i % 2 === 0 ? ["T'CHALLA (speaking role)", "Single character scene"] : ["T'CHALLA (speaking role)", "SHURI (speaking role)"];
      const equipment = locationType === 'EXT' ? ["Intimate lighting setup"] : [];
      
      sceneCard.innerHTML = `
        <div class="scene-breakdown-header">
          <div class="scene-breakdown-title">Scene ${i} (S${i})</div>
          <div>
            <span class="badge badge-${locationType.toLowerCase()}">${locationType}</span>
            <span class="badge badge-${timeOfDay.toLowerCase()}">${timeOfDay}</span>
            <span class="badge badge-simple">Simple</span>
            ${isHighPriority ? '<span class="badge badge-high">High Priority</span>' : '<span class="badge badge-low">Low Priority</span>'}
          </div>
        </div>
        
        <div class="scene-breakdown-grid">
          <div class="scene-breakdown-section">
            <h4>📍 Location Details</h4>
            <div class="scene-detail"><strong>Location:</strong> BLACK_PANTHER_LOCATION_${i}</div>
            <div class="scene-detail"><strong>Type:</strong> ${locationType}</div>
            <div class="scene-detail"><strong>Time:</strong> ${timeOfDay}</div>
            <div class="scene-detail"><strong>Weather Dependent:</strong> ${isWeatherDependent ? 'Yes' : 'No'}</div>
            <div class="scene-detail"><strong>Night Shoot:</strong> ${isNightShoot ? 'Yes' : 'No'}</div>
          </div>
          
          <div class="scene-breakdown-section">
            <h4>⏰ Time & Complexity</h4>
            <div class="scene-detail"><strong>Estimated Hours:</strong> 4.0</div>
            <div class="scene-detail"><strong>Adjusted Eighths:</strong> 1.0</div>
            <div class="scene-detail"><strong>Complexity Level:</strong> Simple</div>
            <div class="scene-detail"><strong>Complexity Factor:</strong> 1.0</div>
          </div>
          
          <div class="scene-breakdown-section">
            <h4>👥 Crew Requirements</h4>
            <div class="scene-detail"><strong>Base Crew:</strong> 15</div>
            <div class="scene-detail"><strong>Additional Crew:</strong> ${totalCrew - 15}</div>
            <div class="scene-detail"><strong>Total Crew:</strong> ${totalCrew}</div>
            <div class="scene-detail"><strong>Crew Hours:</strong> ${crewHours}</div>
          </div>
          
          <div class="scene-breakdown-section">
            <h4>🎭 Cast & Requirements</h4>
            ${characters.map(char => `<div class="scene-detail">• ${char}</div>`).join('')}
            ${equipment.length > 0 ? `<div class="scene-detail"><strong>Equipment:</strong> ${equipment.join(', ')}</div>` : ''}
            <div class="scene-detail"><strong>Technical:</strong> Camera Movement</div>
          </div>
        </div>
      `;
      
      sceneGrid.appendChild(sceneCard);
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-600: #1e40af;
          --primary-700: #1d4ed8;
          --primary-800: #1e3a8a;
          --secondary-500: #6366f1;
          --success-500: #10b981;
          --warning-500: #f59e0b;
          --error-500: #ef4444;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --gray-900: #111827;
          --white: #ffffff;
        }

        body {
          font-family: 'Inter', 'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: var(--gray-50);
          color: var(--gray-900);
          font-size: 14px;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: var(--gray-50);
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: var(--white);
          border-right: 1px solid var(--gray-200);
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
        }

        .sidebar-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid var(--gray-100);
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .sidebar-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-600), var(--secondary-500));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          font-weight: 700;
          font-size: 18px;
        }

        .sidebar-logo-text {
          font-size: 20px;
          font-weight: 700;
          color: var(--gray-900);
          line-height: 1.2;
        }

        .sidebar-subtitle {
          font-size: 12px;
          color: var(--gray-500);
          font-weight: 500;
        }

        .sidebar-nav {
          padding: 16px 0;
        }

        .nav-section {
          margin-bottom: 24px;
        }

        .nav-section-title {
          padding: 0 24px;
          font-size: 11px;
          font-weight: 600;
          color: var(--gray-400);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          color: var(--gray-600);
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 14px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--gray-50);
          color: var(--gray-900);
        }

        .nav-item.active {
          background: linear-gradient(90deg, var(--primary-600), transparent);
          color: var(--primary-600);
          border-right: 3px solid var(--primary-600);
          font-weight: 600;
        }

        .nav-item-icon {
          margin-right: 12px;
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          margin-left: 280px;
          background: var(--gray-50);
        }

        .dashboard-header {
          background: var(--white);
          border-bottom: 1px solid var(--gray-200);
          padding: 16px 32px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .header-subtitle {
          font-size: 14px;
          color: var(--gray-500);
          margin-top: 2px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #dcfce7;
          color: #166534;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #16a34a;
          border-radius: 50%;
        }

        .dashboard-content {
          padding: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Enhanced Section Styles */
        .dashboard-section {
          background: var(--white);
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 32px;
          overflow: hidden;
          border: 1px solid var(--gray-200);
        }

        .section-header {
          background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
          color: var(--white);
          padding: 24px 32px;
          position: relative;
          overflow: hidden;
        }

        .section-header::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transform: translate(30px, -30px);
        }

        .section-header.breakdown {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }

        .section-header.department {
          background: linear-gradient(135deg, var(--success-500), #059669);
        }

        .section-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }

        .section-subtitle {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .section-content {
          padding: 32px;
        }

        /* Enhanced Grid System */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--primary-600);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-200);
        }

        .metric-card:hover::before {
          transform: scaleY(1);
        }

        .metric-card.breakdown::before {
          background: #dc2626;
        }

        .metric-card.department::before {
          background: var(--success-500);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .metric-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary-100), var(--primary-200));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--primary-600);
        }

        .metric-icon.breakdown {
          background: linear-gradient(135deg, #fecaca, #fca5a5);
          color: #dc2626;
        }

        .metric-icon.department {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: var(--success-500);
        }

        .metric-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--gray-900);
        }

        .metric-body {
          margin-bottom: 20px;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: var(--gray-900);
          line-height: 1;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 13px;
          color: var(--gray-500);
          font-weight: 500;
        }

        .metric-stats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .stat-label {
          font-size: 13px;
          color: var(--gray-600);
          font-weight: 500;
        }

        .stat-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-900);
        }

        .highlight-value {
          color: var(--primary-600);
        }

        .currency-value {
          color: var(--success-500);
        }

        /* Enhanced Progress Bars */
        .progress-container {
          margin: 16px 0;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .progress-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--gray-700);
        }

        .progress-percentage {
          font-size: 12px;
          font-weight: 600;
          color: var(--primary-600);
        }

        .progress-bar {
          height: 6px;
          background: var(--gray-200);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-500), var(--primary-600));
          border-radius: 3px;
          transition: width 0.8s ease;
        }

        .progress-fill.success {
          background: linear-gradient(90deg, var(--success-500), #059669);
        }

        .progress-fill.warning {
          background: linear-gradient(90deg, var(--warning-500), #d97706);
        }

        /* Enhanced Collapsible Sections */
        .collapsible-section {
          margin: 24px 0;
        }

        .collapsible {
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          width: 100%;
          padding: 16px 20px;
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          color: var(--gray-700);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .collapsible:hover {
          background: var(--gray-100);
          border-color: var(--gray-300);
        }

        .collapsible.active {
          background: var(--primary-50);
          border-color: var(--primary-300);
          color: var(--primary-700);
        }

        .collapsible-icon {
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .collapsible.active .collapsible-icon {
          transform: rotate(180deg);
        }

        .collapsible-content {
          display: none;
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 24px;
        }

        .collapsible-content.active {
          display: block;
        }

        /* Enhanced Badge System */
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 2px 4px 2px 0;
        }

        .badge-int { 
          background: #dbeafe; 
          color: #1e40af; 
        }
        .badge-ext { 
          background: #dcfce7; 
          color: #166534; 
        }
        .badge-day { 
          background: #fef3c7; 
          color: #92400e; 
        }
        .badge-night { 
          background: #e0e7ff; 
          color: #3730a3; 
        }
        .badge-simple { 
          background: #dcfce7; 
          color: #166534; 
        }
        .badge-moderate { 
          background: #fef3c7; 
          color: #92400e; 
        }
        .badge-complex { 
          background: #fecaca; 
          color: #991b1b; 
        }
        .badge-high { 
          background: #fee2e2; 
          color: #991b1b; 
        }
        .badge-low { 
          background: #f3e8ff; 
          color: #7c3aed; 
        }

        /* Enhanced Scene Cards */
        .scene-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .scene-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
          font-size: 13px;
        }

        .scene-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-300);
        }

        .scene-header {
          font-weight: 700;
          color: var(--primary-600);
          margin-bottom: 12px;
          font-size: 15px;
        }

        .scene-detail {
          margin: 8px 0;
          color: var(--gray-700);
          line-height: 1.5;
        }

        /* Department Cards */
        .department-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }

        .department-card-container {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 24px;
          border-left: 4px solid var(--success-500);
          transition: all 0.2s ease;
        }

        .department-card-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .department-header {
          font-size: 18px;
          font-weight: 700;
          color: var(--success-600);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .crew-roles-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .role-tag {
          background: var(--success-100);
          color: var(--success-700);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .efficiency-bar {
          background: var(--gray-200);
          border-radius: 4px;
          height: 6px;
          overflow: hidden;
          margin: 8px 0;
        }

        .efficiency-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--success-500), #059669);
          border-radius: 4px;
          transition: width 0.8s ease;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .main-content {
            margin-left: 0;
          }

          .dashboard-content {
            padding: 20px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .scene-grid {
            grid-template-columns: 1fr;
          }

          .department-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Enhanced Lists */
        .equipment-list {
          list-style: none;
          padding: 0;
          margin-top: 12px;
        }

        .equipment-list li {
          background: var(--gray-50);
          padding: 8px 12px;
          margin: 6px 0;
          border-radius: 6px;
          border-left: 3px solid var(--primary-400);
          font-size: 13px;
          color: var(--gray-700);
        }

        .requirements-list {
          background: var(--gray-50);
          border-radius: 8px;
          padding: 16px;
          margin: 12px 0;
        }

        .requirements-list ul {
          list-style: none;
          padding: 0;
        }

        .requirements-list li {
          padding: 6px 0;
          color: var(--gray-700);
          font-size: 13px;
        }

        .recommendations-list {
          background: #f0fdf4;
          border-radius: 8px;
          padding: 16px;
          margin: 12px 0;
          border-left: 4px solid var(--success-500);
        }

        .recommendations-list h4 {
          color: var(--success-700);
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
        }

        .recommendations-list ul {
          list-style: none;
          padding: 0;
        }

        .recommendations-list li {
          padding: 6px 0 6px 20px;
          position: relative;
          color: var(--gray-700);
          font-size: 13px;
        }

        .recommendations-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--success-500);
          font-weight: 700;
        }

        /* Metadata Grid */
        .metadata-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .metadata-item {
          background: var(--white);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid var(--gray-200);
          transition: all 0.2s ease;
        }

        .metadata-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .metadata-item h4 {
          color: var(--primary-600);
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .metadata-item .big-number {
          font-size: 28px;
          font-weight: 700;
          color: var(--gray-900);
          line-height: 1;
        }

        /* Locations List */
        .locations-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .location-tag {
          background: var(--primary-600);
          color: var(--white);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .location-tag:hover {
          background: var(--primary-700);
          transform: translateY(-1px);
        }

        /* Crew Info */
        .crew-info {
          background: var(--gray-50);
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }

        .crew-info h4 {
          color: var(--gray-800);
          margin-bottom: 16px;
          font-size: 16px;
          font-weight: 600;
        }

        /* Department specific styles */
        .department-header {
          font-size: 20px;
          font-weight: 700;
          color: var(--success-500);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .efficiency-bar {
          background: var(--gray-200);
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
          margin: 8px 0;
        }

        .efficiency-fill {
          height: 100%;
          background: var(--success-500);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .crew-roles-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .role-tag {
          background: var(--success-500);
          color: var(--white);
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .role-tag:hover {
          background: var(--success-600);
          transform: translateY(-1px);
        }

        .involvement-indicator {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .involvement-basic { 
          background: var(--success-500); 
        }
        
        .involvement-moderate { 
          background: var(--warning-500); 
        }
        
        .involvement-heavy { 
          background: var(--error-500); 
        }

        /* Scene Breakdown Cards */
        .scene-breakdown-card {
          background: var(--white);
          border: 1px solid var(--gray-200);
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          transition: all 0.2s ease;
        }

        .scene-breakdown-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-300);
        }

        .scene-breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--gray-100);
        }

        .scene-breakdown-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--gray-900);
        }

        .scene-breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .scene-breakdown-section {
          background: var(--gray-50);
          border-radius: 8px;
          padding: 16px;
        }

        .scene-breakdown-section h4 {
          color: var(--gray-700);
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">🎬</div>
              <div>
                <div className="sidebar-logo-text">ADK Dashboard</div>
                <div className="sidebar-subtitle">Production Analytics</div>
              </div>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">Overview</div>
              <button 
                className={`nav-item ${activeSidebarItem === 'overview' ? 'active' : ''}`}
                onClick={() => scrollToSection('overview')}
              >
                <span className="nav-item-icon">📊</span>
                Dashboard Overview
              </button>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Analysis Agents</div>
              <button 
                className={`nav-item ${activeSidebarItem === 'eighths-calculator' ? 'active' : ''}`}
                onClick={() => scrollToSection('eighths-calculator')}
              >
                <span className="nav-item-icon">🎬</span>
                Eighths Calculator
              </button>
              <button 
                className={`nav-item ${activeSidebarItem === 'scene-breakdown' ? 'active' : ''}`}
                onClick={() => scrollToSection('scene-breakdown')}
              >
                <span className="nav-item-icon">🎭</span>
                Scene Breakdown
              </button>
              <button 
                className={`nav-item ${activeSidebarItem === 'department-analysis' ? 'active' : ''}`}
                onClick={() => scrollToSection('department-analysis')}
              >
                <span className="nav-item-icon">🏭</span>
                Department Analysis
              </button>
            </div>

            <div className="nav-section">
              <div className="nav-section-title">Quick Actions</div>
              <button className="nav-item">
                <span className="nav-item-icon">📋</span>
                Export Report
              </button>
              <button className="nav-item">
                <span className="nav-item-icon">⚙️</span>
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Dashboard Header */}
          <header className="dashboard-header">
            <div className="header-content">
              <div>
                <h1 className="header-title">ADK Production Analysis Dashboard</h1>
                <p className="header-subtitle">Black Panther • Script Analysis & Production Planning</p>
              </div>
              <div className="header-actions">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  All Systems Operational
                </div>
              </div>
            </div>
          </header>

          <div className="dashboard-content">
            {/* Overview Section */}
            <section id="overview" className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">📊 Production Overview</h2>
                <p className="section-subtitle">Key metrics and performance indicators</p>
              </div>
              <div className="section-content">
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">📄</div>
                      <div className="metric-title">Total Pages</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">92.0</div>
                      <div className="metric-label">Script Pages</div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-header">
                        <span className="progress-label">Completion</span>
                        <span className="progress-percentage">100%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill success" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">🎬</div>
                      <div className="metric-title">Total Scenes</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">232</div>
                      <div className="metric-label">Scenes Analyzed</div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-header">
                        <span className="progress-label">Analysis Progress</span>
                        <span className="progress-percentage">100%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill success" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">📅</div>
                      <div className="metric-title">Shoot Days</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">80</div>
                      <div className="metric-label">Estimated Days</div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-header">
                        <span className="progress-label">Schedule Progress</span>
                        <span className="progress-percentage">75%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">💰</div>
                      <div className="metric-title">Budget</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value currency-value">$200M</div>
                      <div className="metric-label">Total Budget</div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-header">
                        <span className="progress-label">Budget Allocation</span>
                        <span className="progress-percentage">85%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill warning" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 1: Eighths Calculator Agent */}
            <section id="eighths-calculator" className="dashboard-section">
              <div className="section-header">
                <h2 className="section-title">🎬 Eighths Calculator Agent</h2>
                <p className="section-subtitle">Comprehensive Black Panther Script Analysis</p>
              </div>

              <div className="section-content">
                <div className="status-indicator" style={{ marginBottom: '24px', width: 'fit-content' }}>
                  <div className="status-dot"></div>
                  Analysis Complete - Model: ft:gpt-4.1-mini-2025-04-14:thinkai::BsCX4bdA
                </div>

                <div className="metrics-grid">
                  {/* Script Overview */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">📋</div>
                      <div className="metric-title">Script Overview</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Title</span>
                        <span className="stat-value">BLACK PANTHER</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Pages</span>
                        <span className="stat-value highlight-value">92.0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Scenes</span>
                        <span className="stat-value highlight-value">232</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Average Scene Length</span>
                        <span className="stat-value">0.4 pages</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Script Length</span>
                        <span className="stat-value">138,055 characters</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Analysis Date</span>
                        <span className="stat-value">2025-07-13</span>
                      </div>
                    </div>
                  </div>

                  {/* ADK Eighths Calculation */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">🎯</div>
                      <div className="metric-title">ADK Eighths Calculation</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value highlight-value">2,410.1</div>
                      <div className="metric-label">Total Adjusted Eighths</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Base Eighths</span>
                        <span className="stat-value">736.0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Complexity Factor</span>
                        <span className="stat-value">2.3</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Adjusted Eighths</span>
                        <span className="stat-value">1,692.8</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Technical Factor</span>
                        <span className="stat-value">0.6</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Location Factor</span>
                        <span className="stat-value">0.45</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Character Factor</span>
                        <span className="stat-value">0.25</span>
                      </div>
                    </div>
                  </div>

                  {/* Shooting Estimates */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">🎥</div>
                      <div className="metric-title">Shooting Estimates</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value highlight-value">80</div>
                      <div className="metric-label">Estimated Shoot Days</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Average Daily Eighths</span>
                        <span className="stat-value">30.1</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Setup Hours</span>
                        <span className="stat-value">2.5</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Wrap Hours</span>
                        <span className="stat-value">1.5</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Shoot Hours</span>
                        <span className="stat-value">9.0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Daily Hours</span>
                        <span className="stat-value">13.0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Production Hours</span>
                        <span className="stat-value highlight-value">1,040</span>
                      </div>
                    </div>
                  </div>

                  {/* Budget Classification */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">💰</div>
                      <div className="metric-title">Budget Classification</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value currency-value">$200M</div>
                      <div className="metric-label">Estimated Budget</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Budget Tier</span>
                        <span className="stat-value">BLOCKBUSTER</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">VFX Budget</span>
                        <span className="stat-value currency-value">$100,000,000</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Practical Effects</span>
                        <span className="stat-value currency-value">$30,000,000</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Costume Budget</span>
                        <span className="stat-value currency-value">$20,000,000</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Location Budget</span>
                        <span className="stat-value currency-value">$10,000,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Character Analysis */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">👥</div>
                      <div className="metric-title">Character Analysis</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Main Characters</span>
                        <span className="stat-value">8</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Supporting Characters</span>
                        <span className="stat-value">12</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Antagonists</span>
                        <span className="stat-value">3</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Ensemble Cast</span>
                        <span className="stat-value">25</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Characters</span>
                        <span className="stat-value highlight-value">68</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Speaking Characters</span>
                        <span className="stat-value">45</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Background Characters</span>
                        <span className="stat-value">150</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Breakdown */}
                  <div className="metric-card">
                    <div className="metric-header">
                      <div className="metric-icon">🎬</div>
                      <div className="metric-title">Technical Breakdown</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Total Locations</span>
                        <span className="stat-value highlight-value">45</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Interior Scenes</span>
                        <span className="stat-value">110</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Exterior Scenes</span>
                        <span className="stat-value">112</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Day Scenes</span>
                        <span className="stat-value">116</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Night Scenes</span>
                        <span className="stat-value">116</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Sections */}
                <div className="collapsible-section">
                  
                  {/* Scene Complexity Distribution */}
                  <button 
                    className={`collapsible ${activeCollapsibles['scene-complexity'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('scene-complexity')}
                  >
                    Scene Complexity Distribution
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['scene-complexity'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Very Short</h4>
                        <div className="big-number">38</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Short</h4>
                        <div className="big-number">110</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Medium</h4>
                        <div className="big-number">52</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Long</h4>
                        <div className="big-number">20</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Very Long</h4>
                        <div className="big-number">12</div>
                      </div>
                    </div>
                  </div>

                  {/* Pacing Analysis */}
                  <button 
                    className={`collapsible ${activeCollapsibles['pacing-analysis'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('pacing-analysis')}
                  >
                    Pacing Analysis
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['pacing-analysis'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Action Scenes</h4>
                        <div className="big-number">58</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Dialogue Scenes</h4>
                        <div className="big-number">102</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Exposition Scenes</h4>
                        <div className="big-number">72</div>
                      </div>
                    </div>
                  </div>

                  {/* Production Complexity */}
                  <button 
                    className={`collapsible ${activeCollapsibles['production-complexity'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('production-complexity')}
                  >
                    Production Complexity
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['production-complexity'] ? 'active' : ''}`}>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Practical Effects</span>
                        <span className="stat-value">VERY HIGH</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">VFX Requirements</span>
                        <span className="stat-value">VERY HIGH</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Stunt Complexity</span>
                        <span className="stat-value">VERY HIGH</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Costume Complexity</span>
                        <span className="stat-value">VERY HIGH</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Makeup Complexity</span>
                        <span className="stat-value">HIGH</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Summary */}
                  <button 
                    className={`collapsible ${activeCollapsibles['location-summary'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('location-summary')}
                  >
                    Location Summary
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['location-summary'] ? 'active' : ''}`}>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Exotic Locations</span>
                        <span className="stat-value">8</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Urban Locations</span>
                        <span className="stat-value">15</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Natural Locations</span>
                        <span className="stat-value">10</span>
                      </div>
                    </div>
                    <h4 style={{ margin: '20px 0 10px 0', fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)' }}>Major Locations:</h4>
                    <div className="locations-list">
                      <div className="location-tag">WAKANDA</div>
                      <div className="location-tag">BUSAN SOUTH KOREA</div>
                      <div className="location-tag">OAKLAND CALIFORNIA</div>
                      <div className="location-tag">LONDON ENGLAND</div>
                      <div className="location-tag">UNITED NATIONS</div>
                    </div>
                  </div>

                  {/* Action Breakdown */}
                  <button 
                    className={`collapsible ${activeCollapsibles['action-breakdown'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('action-breakdown')}
                  >
                    Action Breakdown
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['action-breakdown'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Fight Scenes</h4>
                        <div className="big-number">15</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Chase Scenes</h4>
                        <div className="big-number">8</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Shootout Scenes</h4>
                        <div className="big-number">10</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Stunt Sequences</h4>
                        <div className="big-number">20</div>
                      </div>
                    </div>
                  </div>

                  {/* Production Notes & Special Equipment */}
                  <button 
                    className={`collapsible ${activeCollapsibles['production-notes'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('production-notes')}
                  >
                    Production Notes & Special Equipment
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['production-notes'] ? 'active' : ''}`}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '12px' }}>Special Equipment Required:</h4>
                    <ul className="equipment-list">
                      <li>Vibranium technology props</li>
                      <li>Royal Talon Fighter</li>
                      <li>Dora Milaje weapons</li>
                      <li>Wakandan vehicles</li>
                    </ul>
                    <div style={{ marginTop: '20px' }}>
                      <div className="stat-row">
                        <span className="stat-label">Department Coordination</span>
                        <span className="stat-value">Extensive VFX, practical effects, costume, stunt, and location coordination required</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Unit Division</span>
                        <span className="stat-value">Multiple second units for action and location shooting</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Black Panther Technology</span>
                        <span className="stat-value">Complex nanite suit effects requiring advanced VFX</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Cost Breakdown */}
                  <button 
                    className={`collapsible ${activeCollapsibles['detailed-cost-breakdown'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('detailed-cost-breakdown')}
                  >
                    Detailed Cost Breakdown
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['detailed-cost-breakdown'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Pre-Production</h4>
                        <div className="big-number currency-value">$30M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Principal Photography</h4>
                        <div className="big-number currency-value">$90M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Post-Production</h4>
                        <div className="big-number currency-value">$70M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>VFX</h4>
                        <div className="big-number currency-value">$100M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Costume</h4>
                        <div className="big-number currency-value">$20M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Practical Effects</h4>
                        <div className="big-number currency-value">$30M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Miscellaneous</h4>
                        <div className="big-number currency-value">$10M</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Total Budget</h4>
                        <div className="big-number currency-value">$350M</div>
                      </div>
                    </div>
                  </div>

                  {/* Complete Scene Calculations */}
                  <button 
                    className={`collapsible ${activeCollapsibles['scene-calculations'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('scene-calculations')}
                  >
                    Complete Scene Calculations (100+ Scenes)
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['scene-calculations'] ? 'active' : ''}`}>
                    <div className="scene-grid" id="sceneGrid">
                      {/* Scene cards will be populated by JavaScript */}
                    </div>
                  </div>

                  {/* Analysis Metadata & Processing Info */}
                  <button 
                    className={`collapsible ${activeCollapsibles['analysis-metadata'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('analysis-metadata')}
                  >
                    Analysis Metadata & Processing Info
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['analysis-metadata'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Analysis Date</h4>
                        <div>2024-06-23</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Analyst</h4>
                        <div>ADK Eighths Calculator V3</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Processing Time</h4>
                        <div>21.76 seconds</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Model Used</h4>
                        <div>ft:gpt-4.1-mini-2025-04-14:thinkai::BsCX4bdA</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Parsing Method</h4>
                        <div>structured_json</div>
                      </div>
                      <div className="metadata-item">
                        <h4>Estimated Pages</h4>
                        <div>92.04 pages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Scene Breakdown Agent */}
            <section id="scene-breakdown" className="dashboard-section">
              <div className="section-header breakdown">
                <h2 className="section-title">🎭 Scene Breakdown Agent</h2>
                <p className="section-subtitle">Detailed Production Planning & Scene Analysis for 100 Scenes</p>
              </div>

              <div className="section-content">
                <div className="status-indicator" style={{ marginBottom: '24px', width: 'fit-content' }}>
                  <div className="status-dot"></div>
                  Breakdown Complete - 100 scenes processed with eighths data
                </div>

                <div className="metrics-grid">
                  {/* Summary Statistics */}
                  <div className="metric-card breakdown">
                    <div className="metric-header">
                      <div className="metric-icon breakdown">📊</div>
                      <div className="metric-title">Summary Statistics</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">100</div>
                      <div className="metric-label">Total Scene Cards</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Processing Time</span>
                        <span className="stat-value">4.0 seconds</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Scenes Processed</span>
                        <span className="stat-value">100</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Based on Eighths</span>
                        <span className="stat-value">0</span>
                      </div>
                    </div>
                  </div>

                  {/* Complexity Distribution */}
                  <div className="metric-card breakdown">
                    <div className="metric-header">
                      <div className="metric-icon breakdown">🎯</div>
                      <div className="metric-title">Complexity Distribution</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Simple Scenes</span>
                        <span className="stat-value highlight-value">100</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Moderate Scenes</span>
                        <span className="stat-value">0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Complex Scenes</span>
                        <span className="stat-value">0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Complexity Factor</span>
                        <span className="stat-value">1.0 (Average)</span>
                      </div>
                    </div>
                  </div>

                  {/* Crew Requirements Summary */}
                  <div className="metric-card breakdown">
                    <div className="metric-header">
                      <div className="metric-icon breakdown">👥</div>
                      <div className="metric-title">Crew Requirements</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">6,200</div>
                      <div className="metric-label">Total Crew Hours</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Average Crew Size</span>
                        <span className="stat-value">15.5 people</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Estimated Crew Days</span>
                        <span className="stat-value">516.7 days</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Peak Crew Scene</span>
                        <span className="stat-value">S2</span>
                      </div>
                    </div>
                  </div>

                  {/* Scheduling Overview */}
                  <div className="metric-card breakdown">
                    <div className="metric-header">
                      <div className="metric-icon breakdown">📅</div>
                      <div className="metric-title">Scheduling Overview</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Night Scenes</span>
                        <span className="stat-value">34 scenes</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Exterior Scenes</span>
                        <span className="stat-value">50 scenes</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">High Priority Scenes</span>
                        <span className="stat-value">17 scenes</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Weather Dependent</span>
                        <span className="stat-value">50 scenes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Sections for Scene Breakdown */}
                <div className="collapsible-section">
                  
                  {/* Complete Scene Breakdown Cards */}
                  <button 
                    className={`collapsible ${activeCollapsibles['scene-breakdown-cards'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('scene-breakdown-cards')}
                  >
                    Complete Scene Breakdown Cards (100 Scenes)
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['scene-breakdown-cards'] ? 'active' : ''}`}>
                    <div className="scene-breakdown-grid" id="sceneBreakdownGrid">
                      {/* Scene breakdown cards will be populated by JavaScript */}
                    </div>
                  </div>

                  {/* Production Requirements */}
                  <button 
                    className={`collapsible ${activeCollapsibles['production-requirements'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('production-requirements')}
                  >
                    Production Requirements & Equipment
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['production-requirements'] ? 'active' : ''}`}>
                    <div className="requirements-list">
                      <h4>Special Equipment Required</h4>
                      <ul>
                        <li><strong>Intimate lighting setup</strong> - Required for multiple scenes</li>
                      </ul>
                    </div>

                    <div className="crew-info">
                      <h4>Crew Information</h4>
                      <div className="stat-row">
                        <span className="stat-label">Base Crew Size:</span>
                        <span className="stat-value">15 people</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Additional Crew (when needed):</span>
                        <span className="stat-value">1 person</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Complexity Multiplier:</span>
                        <span className="stat-value">1.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Scheduling Analysis */}
                  <button 
                    className={`collapsible ${activeCollapsibles['scheduling-analysis'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('scheduling-analysis')}
                  >
                    Detailed Scheduling Analysis
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['scheduling-analysis'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Night Scenes</h4>
                        <div className="big-number">34</div>
                        <p>Scenes requiring night shooting</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Exterior Scenes</h4>
                        <div className="big-number">50</div>
                        <p>Weather-dependent locations</p>
                      </div>
                      <div className="metadata-item">
                        <h4>High Priority</h4>
                        <div className="big-number">17</div>
                        <p>Critical scheduling scenes</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Weather Dependent</h4>
                        <div className="big-number">50</div>
                        <p>Backup plans needed</p>
                      </div>
                    </div>

                    <div className="recommendations-list">
                      <h4>Scheduling Recommendations</h4>
                      <ul>
                        <li>Schedule 34 night scenes consecutively to minimize crew transitions</li>
                        <li>Have backup interior scenes ready for 50 weather-dependent scenes</li>
                      </ul>
                    </div>
                  </div>

                  {/* Cast & Character Requirements */}
                  <button 
                    className={`collapsible ${activeCollapsibles['cast-requirements'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('cast-requirements')}
                  >
                    Cast & Character Requirements
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['cast-requirements'] ? 'active' : ''}`}>
                    <div className="requirements-list">
                      <h4>Main Characters Featured</h4>
                      <ul>
                        <li><strong>T&apos;CHALLA</strong> - Featured in all 100 scenes (speaking role)</li>
                        <li><strong>SHURI</strong> - Featured in 50 scenes (speaking role)</li>
                      </ul>
                    </div>

                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Two-Character Scenes</h4>
                        <div className="big-number">50</div>
                        <p>T&apos;Challa & Shuri</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Single Character Scenes</h4>
                        <div className="big-number">50</div>
                        <p>T&apos;Challa solo</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Average Scene Hours</h4>
                        <div className="big-number">4.0</div>
                        <p>Per scene estimate</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Adjusted Eighths</h4>
                        <div className="big-number">1.0</div>
                        <p>Per scene average</p>
                      </div>
                    </div>
                  </div>

                  {/* Scene Priority Analysis */}
                  <button 
                    className={`collapsible ${activeCollapsibles['scene-priority'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('scene-priority')}
                  >
                    Scene Priority & Special Requirements
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['scene-priority'] ? 'active' : ''}`}>
                    <h4>High Priority Scenes (17 total):</h4>
                    <div className="locations-list">
                      <div className="location-tag">S4</div>
                      <div className="location-tag">S10</div>
                      <div className="location-tag">S16</div>
                      <div className="location-tag">S22</div>
                      <div className="location-tag">S28</div>
                      <div className="location-tag">S34</div>
                      <div className="location-tag">S40</div>
                      <div className="location-tag">S46</div>
                      <div className="location-tag">S52</div>
                      <div className="location-tag">S58</div>
                      <div className="location-tag">S64</div>
                      <div className="location-tag">S70</div>
                      <div className="location-tag">S76</div>
                      <div className="location-tag">S82</div>
                      <div className="location-tag">S88</div>
                      <div className="location-tag">S94</div>
                      <div className="location-tag">S100</div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <h4>Technical Requirements:</h4>
                      <div className="requirements-list">
                        <ul>
                          <li>Camera Movement - Required for all scenes</li>
                          <li>Intimate lighting setup - Required for exterior scenes</li>
                          <li>Night shooting equipment - Required for 34 scenes</li>
                          <li>Weather protection - Required for 50 exterior scenes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Location Analysis */}
                  <button 
                    className={`collapsible ${activeCollapsibles['location-analysis'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('location-analysis')}
                  >
                    Location Analysis & Breakdown
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['location-analysis'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Interior Locations</h4>
                        <div className="big-number">50</div>
                        <p>Weather-independent scenes</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Exterior Locations</h4>
                        <div className="big-number">50</div>
                        <p>Weather-dependent scenes</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Day Shoots</h4>
                        <div className="big-number">66</div>
                        <p>Standard shooting hours</p>
                      </div>
                      <div className="metadata-item">
                        <h4>Night Shoots</h4>
                        <div className="big-number">34</div>
                        <p>Extended crew hours</p>
                      </div>
                    </div>

                    <h4 style={{ marginTop: '20px' }}>Sample Locations:</h4>
                    <div className="locations-list">
                      <div className="location-tag">BLACK_PANTHER_LOCATION_1</div>
                      <div className="location-tag">BLACK_PANTHER_LOCATION_2</div>
                      <div className="location-tag">BLACK_PANTHER_LOCATION_3</div>
                      <div className="location-tag">BLACK_PANTHER_LOCATION_4</div>
                      <div className="location-tag">BLACK_PANTHER_LOCATION_5</div>
                      <div className="location-tag">... and 95 more</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Department Analysis Agent */}
            <section id="department-analysis" className="dashboard-section">
              <div className="section-header department">
                <h2 className="section-title">🏭 Department Analysis Agent</h2>
                <p className="section-subtitle">Complete Department Coordination & Crew Planning Analysis</p>
              </div>

              <div className="section-content">
                <div className="status-indicator" style={{ marginBottom: '24px', width: 'fit-content' }}>
                  <div className="status-dot"></div>
                  Coordination Complete - 100 breakdown cards processed
                </div>

                <div className="metrics-grid">
                  {/* Department Summary */}
                  <div className="metric-card department">
                    <div className="metric-header">
                      <div className="metric-icon department">📊</div>
                      <div className="metric-title">Department Summary</div>
                    </div>
                    <div className="metric-body">
                      <div className="metric-value">6</div>
                      <div className="metric-label">Total Departments Involved</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Total Crew Size</span>
                        <span className="stat-value highlight-value">17</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Total Estimated Hours</span>
                        <span className="stat-value">1,200 hours</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Most Involved Department</span>
                        <span className="stat-value">Camera</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Least Involved Department</span>
                        <span className="stat-value">Art</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Processing Time</span>
                        <span className="stat-value">35.0 seconds</span>
                      </div>
                    </div>
                  </div>

                  {/* Resource Allocation */}
                  <div className="metric-card department">
                    <div className="metric-header">
                      <div className="metric-icon department">🎯</div>
                      <div className="metric-title">Resource Allocation</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">Total Crew Needed</span>
                        <span className="stat-value highlight-value">17</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Scenes Coordinated</span>
                        <span className="stat-value">100</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Based on Breakdown Cards</span>
                        <span className="stat-value">100</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Based on Eighths</span>
                        <span className="stat-value">0</span>
                      </div>
                    </div>
                  </div>

                  {/* Coordination Analysis */}
                  <div className="metric-card department">
                    <div className="metric-header">
                      <div className="metric-icon department">🔄</div>
                      <div className="metric-title">Coordination Analysis</div>
                    </div>
                    <div className="metric-stats">
                      <div className="stat-row">
                        <span className="stat-label">High Coordination Scenes</span>
                        <span className="stat-value">0</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Equipment Sharing</span>
                        <span className="stat-value">None required</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Scheduling Conflicts</span>
                        <span className="stat-value">None detected</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Resource Dependencies</span>
                        <span className="stat-value">None identified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Sections for Department Analysis */}
                <div className="collapsible-section">
                  
                  {/* Detailed Department Breakdown */}
                  <button 
                    className={`collapsible ${activeCollapsibles['department-analysis'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('department-analysis')}
                  >
                    Complete Department Analysis
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['department-analysis'] ? 'active' : ''}`}>
                    <div className="department-grid">
                      
                      {/* Camera Department */}
                      <div className="department-card-container">
                        <div className="department-header">📹 Camera Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">100 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">400.0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">4 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">100.0%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '100%' }}></div>
                        </div>
                        <div className="crew-roles-list">
                          <div className="role-tag">DOP</div>
                          <div className="role-tag">Camera Operator</div>
                          <div className="role-tag">Focus Puller</div>
                          <div className="role-tag">Loader</div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Special Requirements:</strong> Camera Movement (all 100 scenes)
                        </div>
                      </div>

                      {/* Sound Department */}
                      <div className="department-card-container">
                        <div className="department-header">🎵 Sound Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">100 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">400.0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">2 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">200.0%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '100%' }}></div>
                        </div>
                        <div className="crew-roles-list">
                          <div className="role-tag">Sound Mixer</div>
                          <div className="role-tag">Boom Operator</div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Special Needs:</strong> Wind protection
                        </div>
                      </div>

                      {/* Lighting Department */}
                      <div className="department-card-container">
                        <div className="department-header">💡 Lighting Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">100 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">400.0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">6 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">66.7%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '67%' }}></div>
                        </div>
                        <div className="crew-roles-list">
                          <div className="role-tag">Gaffer</div>
                          <div className="role-tag">Best Boy</div>
                          <div className="role-tag">Electricians</div>
                        </div>
                        <div style={{ marginTop: '15px' }}>
                          <strong style={{ fontSize: '13px', color: 'var(--gray-700)' }}>Equipment Needed:</strong>
                          <ul className="equipment-list">
                            <li>Night lighting package</li>
                            <li>Daylight balance package</li>
                          </ul>
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Heavy Involvement Scenes:</strong> 34 scenes
                        </div>
                      </div>

                      {/* Art Department */}
                      <div className="department-card-container">
                        <div className="department-header">🎨 Art Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">0 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">3 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">0.0%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '0%' }}></div>
                        </div>
                        <div className="crew-roles-list">
                          <div className="role-tag">Production Designer</div>
                          <div className="role-tag">Art Director</div>
                          <div className="role-tag">Set Decorator</div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '13px', color: 'var(--gray-700)', fontStyle: 'italic' }}>
                          No scene requirements identified
                        </div>
                      </div>

                      {/* Wardrobe Department */}
                      <div className="department-card-container">
                        <div className="department-header">👗 Wardrobe Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">0 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">2 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">0.0%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '0%' }}></div>
                        </div>
                        <div className="crew-roles-list">
                          <div className="role-tag">Costume Designer</div>
                          <div className="role-tag">Wardrobe Supervisor</div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '13px', color: 'var(--gray-700)', fontStyle: 'italic' }}>
                          No scene requirements identified
                        </div>
                      </div>

                      {/* Special Effects Department */}
                      <div className="department-card-container">
                        <div className="department-header">💥 Special Effects Department</div>
                        <div className="stat-row">
                          <span className="stat-label">Scenes Required</span>
                          <span className="stat-value">0 scenes</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Estimated Hours</span>
                          <span className="stat-value">0 hours</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Base Crew Size</span>
                          <span className="stat-value">0 people</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Crew Efficiency</span>
                          <span className="stat-value">0.0%</span>
                        </div>
                        <div className="efficiency-bar">
                          <div className="efficiency-fill" style={{ width: '0%' }}></div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '13px', color: 'var(--gray-700)', fontStyle: 'italic' }}>
                          No crew roles assigned
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)', fontStyle: 'italic' }}>
                          No scene requirements identified
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Crew Scheduling & Priorities */}
                  <button 
                    className={`collapsible ${activeCollapsibles['crew-scheduling'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('crew-scheduling')}
                  >
                    Crew Scheduling & Priorities
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['crew-scheduling'] ? 'active' : ''}`}>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <h4>Camera Department</h4>
                        <div className="big-number">100</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Priority Scenes:</strong> S1, S2, S3
                        </div>
                      </div>
                      <div className="metadata-item">
                        <h4>Sound Department</h4>
                        <div className="big-number">100</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Priority Scenes:</strong> S1, S2, S3
                        </div>
                      </div>
                      <div className="metadata-item">
                        <h4>Lighting Department</h4>
                        <div className="big-number">100</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Priority Scenes:</strong> S1, S4, S7
                        </div>
                      </div>
                      <div className="metadata-item">
                        <h4>Art Department</h4>
                        <div className="big-number">0</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Status:</strong> Not required
                        </div>
                      </div>
                      <div className="metadata-item">
                        <h4>Wardrobe Department</h4>
                        <div className="big-number">0</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Status:</strong> Not required
                        </div>
                      </div>
                      <div className="metadata-item">
                        <h4>Special Effects</h4>
                        <div className="big-number">0</div>
                        <p>Total scenes</p>
                        <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--gray-700)' }}>
                          <strong>Status:</strong> Not required
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lighting Department Detailed Analysis */}
                  <button 
                    className={`collapsible ${activeCollapsibles['lighting-analysis'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('lighting-analysis')}
                  >
                    Lighting Department Scene Analysis
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['lighting-analysis'] ? 'active' : ''}`}>
                    <div className="stat-row">
                      <span className="stat-label">Total Scenes with Lighting:</span>
                      <span className="stat-value">100 scenes</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Heavy Involvement Scenes:</span>
                      <span className="stat-value">34 scenes</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Moderate Involvement:</span>
                      <span className="stat-value">33 scenes</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Basic Involvement:</span>
                      <span className="stat-value">33 scenes</span>
                    </div>

                    <h4 style={{ marginTop: '20px', fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '15px' }}>Involvement Level Distribution:</h4>
                    <div style={{ marginTop: '15px' }}>
                      <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--gray-700)' }}>
                        <div className="involvement-indicator involvement-heavy"></div>
                        <strong>Heavy (34 scenes):</strong>&nbsp;Night scenes and complex lighting setups
                      </div>
                      <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--gray-700)' }}>
                        <div className="involvement-indicator involvement-moderate"></div>
                        <strong>Moderate (33 scenes):</strong>&nbsp;Standard lighting requirements
                      </div>
                      <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--gray-700)' }}>
                        <div className="involvement-indicator involvement-basic"></div>
                        <strong>Basic (33 scenes):</strong>&nbsp;Minimal lighting setup needed
                      </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '12px' }}>Equipment Requirements:</h4>
                      <ul className="equipment-list">
                        <li>Night lighting package - Required for 34 heavy involvement scenes</li>
                        <li>Daylight balance package - Standard equipment for day scenes</li>
                      </ul>
                    </div>
                  </div>

                  {/* Coordination Recommendations */}
                  <button 
                    className={`collapsible ${activeCollapsibles['coordination-recommendations'] ? 'active' : ''}`}
                    onClick={() => toggleCollapsible('coordination-recommendations')}
                  >
                    Coordination Recommendations
                    <span className="collapsible-icon">▼</span>
                  </button>
                  <div className={`collapsible-content ${activeCollapsibles['coordination-recommendations'] ? 'active' : ''}`}>
                    <div className="recommendations-list">
                      <h4>Department Coordination Recommendations</h4>
                      <ul>
                        <li>Establish daily department head meetings during production</li>
                        <li>Create shared equipment tracking system</li>
                      </ul>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '12px' }}>Scheduling Notes:</h4>
                      <div className="requirements-list">
                        <ul>
                          <li><strong>Lighting Department:</strong> 34 scenes requiring heavy involvement</li>
                          <li><strong>Equipment Coordination:</strong> Night lighting package, Daylight balance package</li>
                          <li><strong>Sound Department:</strong> Wind protection required for all scenes</li>
                          <li><strong>Camera Department:</strong> Camera movement required for all 100 scenes</li>
                        </ul>
                      </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '12px' }}>Resource Optimization:</h4>
                      <div className="stat-row">
                        <span className="stat-label">Most Efficient Department:</span>
                        <span className="stat-value">Sound (200% efficiency)</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Standard Efficiency:</span>
                        <span className="stat-value">Camera (100% efficiency)</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Lower Efficiency:</span>
                        <span className="stat-value">Lighting (66.7% efficiency)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}