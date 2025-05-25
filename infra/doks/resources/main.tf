terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = ">= 2.0.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_vpc" "main" {
  name     = "vpc-${var.project_name}"
  region   = var.region
  ip_range = "10.20.0.0/16" # Alterado para evitar conflito
}

resource "digitalocean_container_registry" "registry" {
  name                   = "${var.project_name}-doks-registry"
  subscription_tier_slug = "basic"
}

resource "digitalocean_kubernetes_cluster" "cluster" {
  name    = "${var.project_name}-doks-cluster"
  region  = var.region
  version = "1.32.2-do.1"
  vpc_uuid = digitalocean_vpc.main.id

  node_pool {
    name       = "default-pool"
    size       = "s-2vcpu-4gb"
    node_count = 1
  }
}

data "digitalocean_project" "target" {
  name = var.project_name
}

# resource "digitalocean_project_resources" "attach" {
#   project = data.digitalocean_project.target.id

#   resources = [
#     digitalocean_kubernetes_cluster.cluster.urn,
#     digitalocean_vpc.main.urn,
#   ]
# }
