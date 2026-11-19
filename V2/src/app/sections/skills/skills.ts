import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

interface SkillNode {
  id: string;
  name: string;
  icon?: string;
  symbol?: string;
  summary: string;
}

interface SkillGroup {
  id: string;
  title: string;
  skills: SkillNode[];
}

@Component({
  imports: [TranslatePipe],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills {
  readonly groups: SkillGroup[] = [
    {
      id: 'backend',
      title: 'Backend e APIs',
      skills: [
        {
          id: 'dotnet',
          name: 'C# / .NET',
          icon: 'csharp.svg',
          summary: 'Backend de serviços, APIs e microsserviços.',
        },
        {
          id: 'rest',
          name: 'APIs REST',
          symbol: 'API',
          summary: 'Integração e comunicação entre aplicações.',
        },
        {
          id: 'microservices',
          name: 'Microsserviços',
          symbol: 'MS',
          summary: 'Arquitetura distribuída aplicada a sistemas financeiros.',
        },
      ],
    },
    {
      id: 'web',
      title: 'Web e interfaces',
      skills: [
        {
          id: 'angular',
          name: 'Angular',
          icon: 'angular.svg',
          summary: 'Desenvolvimento de aplicações web.',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          icon: 'javascript.svg',
          summary: 'Linguagem para aplicações e interações web.',
        },
        {
          id: 'html5',
          name: 'HTML5',
          icon: 'html5.svg',
          summary: 'Estrutura semântica de interfaces web.',
        },
        {
          id: 'css3',
          name: 'CSS3',
          icon: 'css3.svg',
          summary: 'Estilização e responsividade de interfaces.',
        },
      ],
    },
    {
      id: 'cloud-data',
      title: 'Cloud e dados',
      skills: [
        {
          id: 'azure',
          name: 'Microsoft Azure',
          icon: 'azure.svg',
          summary: 'Plataforma cloud usada em soluções e serviços.',
        },
        {
          id: 'aws',
          name: 'AWS',
          icon: 'amazonaws.svg',
          summary: 'Serviços de nuvem, incluindo EC2 e RDS.',
        },
        {
          id: 'dynamodb',
          name: 'DynamoDB',
          icon: 'dynamodb.svg',
          summary: 'Banco NoSQL para aplicações distribuídas.',
        },
        {
          id: 'redis',
          name: 'Redis',
          icon: 'redis.svg',
          summary: 'Armazenamento de dados em memória.',
        },
        {
          id: 'databases',
          name: 'Bancos e analytics',
          symbol: 'DB',
          summary: 'Athena, SQL/PL/SQL, Oracle, PostgreSQL, MongoDB e GCP.',
        },
      ],
    },
    {
      id: 'messaging-operations',
      title: 'Mensageria e operações',
      skills: [
        {
          id: 'kafka',
          name: 'Kafka',
          icon: 'kafka.svg',
          summary: 'Mensageria e processamento de eventos.',
        },
        {
          id: 'rabbitmq',
          name: 'RabbitMQ',
          icon: 'rabbitmq.svg',
          summary: 'Mensageria e integração entre serviços.',
        },
        {
          id: 'containers',
          name: 'Docker / Rancher',
          icon: 'docker.svg',
          summary: 'Containers e orquestração de aplicações.',
        },
        {
          id: 'splunk',
          name: 'Splunk',
          icon: 'splunk.svg',
          summary: 'Monitoramento e análise de logs.',
        },
        {
          id: 'datadog',
          name: 'Datadog',
          icon: 'datadog.svg',
          summary: 'Observabilidade e monitoramento de aplicações.',
        },
      ],
    },
  ];

  selectedSkillId = 'dotnet';

  get selectedSkill(): SkillNode | undefined {
    return this.groups.flatMap((group) => group.skills).find((skill) => skill.id === this.selectedSkillId);
  }

  get selectedGroup(): SkillGroup | undefined {
    return this.groups.find((group) =>
      group.skills.some((skill) => skill.id === this.selectedSkillId),
    );
  }

  selectSkill(skillId: string): void {
    this.selectedSkillId = skillId;
  }
}
