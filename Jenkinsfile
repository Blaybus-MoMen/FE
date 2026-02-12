pipeline {
    agent any

    environment {
        IMAGE_NAME = 'fe-frontend'
        CONTAINER_NAME = 'fe-frontend'
        PORT = '5173'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${PORT}:${PORT} \
                        ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                    sleep 3
                    CONTAINER_IP=\$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${CONTAINER_NAME})
                    curl -f http://\${CONTAINER_IP}:${PORT}/mentor/ || exit 1
                    curl -f http://\${CONTAINER_IP}:${PORT}/mentee/ || exit 1
                """
                echo 'Health check passed!'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }

    post {
        failure {
            echo 'Build or deploy failed!'
        }
        success {
            echo "Deployed successfully on port ${PORT}"
        }
    }
}
