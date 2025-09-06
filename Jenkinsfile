pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/GabrielBTonelli/exercicio-api-cypress-ebac.git'
                sh 'npm install'
            }
        }
        stage('Subindo servidor') {
            steps {
                bat 'start /b npm start'
            }
        }
        stage('Test') {
            steps {
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}