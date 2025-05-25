variable "do_token" {
  description = "Token de acesso da DigitalOcean"
  type        = string
  sensitive   = true
}

variable "project_name" {
  type        = string
  description = "Nome do projeto no DigitalOcean"
  default     = "first-project"
}

variable "region" {
  default = "nyc1"
}

variable "k8s_version" {
  default = "1.29.1-do.0"
}

variable "node_size" {
  default = "s-1vcpu-2gb"
}

variable "node_count" {
  default = 1
}

variable "registry_name" {
  default = "doks-registry"
}
