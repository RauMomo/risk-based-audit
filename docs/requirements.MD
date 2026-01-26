## **Application Type**

A Risk Based Internal Audit, including all the features explained in the overview.MD, enterprise risk management along with internal audit dashboards. but ensure capability to bind from existing ERM datas. Also preparing the Master Data for data collection and analysis process

## Scale

Expected 100-1000 users to use this RBIA based on company size

## Database

My initial idea is to use Postgresql and option to move to Graphql. communication via REST API and gRPC. combination with Redis and other third party services for AI and analytics.

## Deployment

Flexible, with standard security (JWT, bcrypt, HTTPS). Use Docker and Kubenetes for that

## External Services

- Email Services
- Analytics Capabilities
- Security

## Security

It includes data encryption, Access Control, AI Explainability, Data Minimization and Data Residency. Follows the guideline and governancy of ISO 27001, GDPR and Undang Undang PDP

## Performance Load

We hoped to reach this Service Level Agreement:

- The batch upload processing of maximum 3 seconds with expected 10.000 records in single file
- Search query & retrieval of audit findings, evidence, form records of 5 seconds with expected 1 million data, one of them by implementation of redis caching
- Dashboard Load of around 2 seconds during high load (100 concurrent users) by implementing Load balancing
- Email Notification maximum of 6 seconds being sent to all responsible
- Synchronous Report Generation Option for Audit Reports, Compliance and Form Records of 60 seconds on expected 200 pages. Preparing principal templates and doing it in asynchronous way would help the case

## Project Tech Stack

For the Frontend we will be using Nuxtjs, with several libraries defined below
Validation : Zod
State Management : Pinia
Styling: Tailwind CSS
Build Tool: Vite
Chart: Chart.js
UI Components: Headless UI

You can improvise by selecting the more proper library that you think will enhance performance and effectivity of the overall product

## Project Architecture

I expect to have microservice architecture, and set the appropriate structure of the frontend project folders for Enterprise & Large App. It must follow Nuxt 3’s standard structure with file-based routing, auto-imported components, Pinia state management, and built-in server APIs for scalable development.
