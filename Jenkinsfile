pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'leetcode-clone-backend'
        DOCKER_IMAGE_FRONTEND = 'leetcode-clone-frontend'
        COMPOSE_PROJECT_NAME = 'codearena_cloned'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sleep 30
                    sh 'curl -f http://localhost:5000/health || exit 1'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
        always {
            sh 'docker compose ps'
        }
    }
}
