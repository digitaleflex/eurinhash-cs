import { useState } from 'react';
import { FORMATION_PROGRAMS } from '../lib/formationData';
import { Card, Button, Heading, Text, Badge, Grid } from './ui';

export default function ProgramComparison() {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleProgram = (programId: string) => {
    setSelectedPrograms(prev => {
      if (prev.includes(programId)) {
        return prev.filter(id => id !== programId);
      } else if (prev.length < 3) {
        return [...prev, programId];
      }
      return prev;
    });
  };

  const selectedProgramsData = FORMATION_PROGRAMS.filter(p => 
    selectedPrograms.includes(p.id)
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Heading level={2} gradient className="mb-4">
          Comparez nos programmes
        </Heading>
        <Text size="lg" color="muted" className="mb-6">
          Sélectionnez jusqu'à 3 programmes pour les comparer
        </Text>
      </div>

      {/* Program selection */}
      <Grid cols={3} className="lg:grid-cols-5">
        {FORMATION_PROGRAMS.map((program) => (
          <div
            key={program.id}
            className={`cursor-pointer transition-all duration-300 bg-[#1A1F3C]/80 backdrop-blur-sm border rounded-xl p-6 hover:border-[#007CF0]/50 hover:scale-105 ${
              selectedPrograms.includes(program.id)
                ? 'border-[#00C48C] bg-[#00C48C]/10 scale-105'
                : 'border-gray-600/30'
            }`}
            onClick={() => toggleProgram(program.id)}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{program.icon}</div>
              <Text size="sm" weight="semibold" className="mb-2">
                {program.title}
              </Text>
              <Badge 
                variant={selectedPrograms.includes(program.id) ? 'success' : 'default'}
                size="sm"
              >
                {selectedPrograms.includes(program.id) ? 'Sélectionné' : 'Sélectionner'}
              </Badge>
            </div>
          </div>
        ))}
      </Grid>

      {/* Show comparison button */}
      {selectedPrograms.length >= 2 && (
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowComparison(!showComparison)}
            icon={<span>{showComparison ? '▲' : '▼'}</span>}
          >
            {showComparison ? 'Masquer' : 'Afficher'} la comparaison ({selectedPrograms.length} programmes)
          </Button>
        </div>
      )}

      {/* Comparison table */}
      {showComparison && selectedProgramsData.length >= 2 && (
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600/30">
                <th className="text-left p-4 font-semibold text-gray-300">Critères</th>
                {selectedProgramsData.map((program) => (
                  <th key={program.id} className="text-center p-4 min-w-[200px]">
                    <div className="text-2xl mb-2">{program.icon}</div>
                    <Text weight="semibold">{program.title}</Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600/30">
              <tr>
                <td className="p-4 font-medium text-gray-300">Durée</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Badge variant="info">{program.duration}</Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Niveau</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Badge 
                      variant={
                        program.level === 'Débutant' ? 'success' :
                        program.level === 'Intermédiaire' ? 'warning' : 'default'
                      }
                    >
                      {program.level}
                    </Badge>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Prix</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Text weight="bold" color="primary">
                      {formatPrice(program.price)}
                    </Text>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Compétences principales</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4">
                    <div className="space-y-1">
                      {program.skills.slice(0, 4).map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-[#00C48C]">✓</span>
                          <Text size="xs">{skill}</Text>
                        </div>
                      ))}
                      {program.skills.length > 4 && (
                        <Text size="xs" color="muted">
                          +{program.skills.length - 4} autres...
                        </Text>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Certification</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4">
                    <Text size="xs" color="muted">
                      {program.certification}
                    </Text>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Débouchés</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4">
                    <div className="space-y-1">
                      {program.career.slice(0, 3).map((job, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-[#007CF0]">•</span>
                          <Text size="xs">{job}</Text>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Prochaine session</td>
                {selectedProgramsData.map((program) => (
                  <td key={program.id} className="p-4 text-center">
                    <Badge variant="warning">{program.nextStart}</Badge>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      )}

      {selectedPrograms.length > 0 && (
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedPrograms([]);
              setShowComparison(false);
            }}
          >
            Réinitialiser la sélection
          </Button>
        </div>
      )}
    </div>
  );
}