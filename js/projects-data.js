// Add/edit projects here using this fixed structure:
// { category, title, description, tags: [], demoGif }
window.PROJECTS_DATA = {
  backend: [
    {
      category: "Reactive",
      title: "Reactive Country & Weather Service",
      description:
        "Non-blocking reactive APIs integrating multiple external services using Spring WebFlux and Project Reactor. Async pipelines with Mono/WebClient and reactive error handling with fallback.",
      tags: ["Spring WebFlux", "Project Reactor", "WebClient"],
      demoGif: "assets/demos/reactive-country-weather.gif"
    },
    {
      category: "Security",
      title: "Secure REST API Platform",
      description:
        "Secured REST APIs with JWT authentication and role-based protection. Integrated MySQL using JPA and layered architecture. Prepared Dockerized deployment pipeline.",
      tags: ["Spring Security", "JWT", "MySQL", "Docker"],
      demoGif: "assets/demos/secure-rest-api-platform.gif"
    },
    {
      category: "Automation",
      title: "Spring Boot Email & Acknowledgement Service",
      description:
        "REST service for enquiry emails and automated acknowledgements. Configured SMTP and dynamic email templates using Thymeleaf. Implemented client-server JSON request workflow.",
      tags: ["Spring Boot", "Thymeleaf", "JavaMailSender"],
      demoGif: "assets/demos/springboot-email-acknowledgement.gif"
    },
    {
      category: "Productivity",
      title: "Flowkeeper",
      description:
        "Spring Boot productivity app that automates timed micro-breaks using backend scheduling, REST APIs, and a guided countdown UI. Built with clean architecture, async audio cues, and fault-tolerant design to reflect real-world engineering practices.",
      tags: ["Java 21", "Spring Boot", "Scheduling", "REST API", "HTML", "CSS", "JS"],
      demoGif: "sakshitokekar.github.io/assets/demos/FlowKeeperDemo.gif"
    }
  ],
  data: [
    {
      category: "ETL Pipeline",
      title: "Cloud Data Pipeline on GCP",
      description:
        "End-to-end ETL pipeline using Cloud Storage, Airflow (Composer), Python, and BigQuery. Implemented data validation and transformation logic to ensure accuracy and consistency across datasets.",
      tags: ["GCP", "Airflow", "BigQuery", "Python"],
      demoGif: "assets/demos/cloud-data-pipeline-gcp.gif"
    },
    {
      category: "ML / Big Data",
      title: "Friend Recommendation System",
      description:
        "Large-scale recommendation model using PySpark, MapReduce, and Databricks. Processed and analyzed high-volume datasets to generate data-driven user recommendations at scale.",
      tags: ["PySpark", "MapReduce", "Databricks"],
      demoGif: "assets/demos/friend-recommendation-system.gif"
    }
  ],
  sap: [
    {
      category: "WRICEF",
      title: "Enterprise WRICEF Development",
      description:
        "Designed and delivered full-cycle WRICEF objects — Reports, Interfaces, Conversions, Enhancements, Forms — using OOABAP and Module Pool Programming for S/4HANA and ECC clients.",
      tags: ["ABAP", "OOABAP", "WRICEF", "S/4HANA"],
      demoGif: "assets/demos/enterprise-wricef-development.gif"
    },
    {
      category: "OData & CDS",
      title: "OData Services & CDS View Layer",
      description:
        "Built and consumed OData services and CDS views to enable Fiori applications, embedded analytics, and real-time integrations across SAP modules including MM, SD, and FICO.",
      tags: ["OData", "CDS Views", "HANA SQL", "RFC"],
      demoGif: "assets/demos/odata-cds-view-layer.gif"
    }
  ]
};
