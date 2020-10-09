---
title: Kubernetes(k8s) Basics
date: 2019-01-29
description: Learn the basics of k8s architecture, we will look at the basic building blocks, pod, nodes, kube-proxy, kubectl etc.
categories:
  - kubernetes
author_staff_member: rohit
---

So we all have heard of docker, it has taken industry by a storm and completely changed the way application are deployed to servers, I mean having independent environment for every app is great, everyone loves it. But it also created challenges around managing deployments. 

Though there have been many container management tools such as Docker Swarm, CoreOs rkt, Mesos etc. But Kubernetes has emerged as favorite.

Let take a look, what makes Kubernetes such an important player in recent times. 

If you are familiar with the basic nomenclature, you can skip this tutorial.

# What is Kubernetes(k8s)

[Kubernetes (k8s)](https://kubernetes.io/) is an open-source system for automating deployment, scaling, and management of containerized applications.

Basically Kubernetes is a container orchestrator, that helps you with the deployment, lifecycle & management of the container. It provides a set of services and deployment configuration for you to work with and hides all the complexity of infrastructure management such as cpu, memory, storage etc. 

K8s is directed towards reaching desired state, it could be deployment of set of webservices, database engines, caching solutions. 

# Benefits of using Kubernetes

Although there are many things to talk about, here are few main points I would like to mention.
- **Speed of Deployment:** Deployment on k8s is fast, I mean super fast. you provide the configuration, and it would bring all the application to the desired state.
- **Version Management:** Have you had troubles, deploying new version of your app to server, k8s helps you do that simply without any downtime, and you can revert to your original state if anything goes wrong, almost instantly.
- **Ability to recover:** If anything goes wrong k8s engine takes care of bringing back to the desired state, for example, if you wanted 3 instances of your service to be running at all times, and something goes wrong and instance is down, k8s would start a new instance so at the end of the day, you will have your application up & running all the time.
- **Hides complexity of cluster**: Setting up application cluster is a big pain for devops, but with k8s, its very easy.

{% include ad %}

# Operating principles

So k8s works on a very simple principle, always maintain the desired state.You provide a _desired state config_, and k8s will download image, run it, and will maintain the required number of instances.

It provides _controllers(Control Loops)_, which has sole purpose to monitor and bring container to its desired state.

There is an _api server_, which is the only way to communicate with k8s cluster, its core hub of all the information. You can interact with api server using rest api call or a command line tool called kubectl.

# Building Blocks (Key Players)

Lets take a look at some of the building blocks of k8s:

<img alt="building-blocks" src="/images/loader.svg" data-src="/images/2019/k8s/blocks.png"  class="lazy img-center"/>

## Pods
Pod forms the basic unit. It can contain one or more containers running inside it. Pods are ephemeral, i.e. once a pod is dead its not resurrected, if k8s find that the pod has died, it will start a complete new pod.

Pods ensures the atomicity, means either the pod is available or not its not, there is no state as starting or dying, its simply up or down. Each pod maintains the health of all the apps, if any app is down, k8s drops the whole pod and starts a completely new one.

{% include ad %}

## Controllers

Controllers are responsible for maintaining the state of the pods, number of replica's, deployment state etc. It will monitor the state of Pod and also the health of all the apps inside a pod. Controllers also manages the change in replica-sets & container versions. 

## Services

Services adds persistency to k8s engine, it forms the networking abstraction to pods. For e.g. if a pod dies and a new pod is generated in its place, it IP/hostname etc might change, so k8s service forms the facade, and takes care of IP & DNS, it dynamically updates its mapping.

Next important task, these services take care are scalability and load balancing. 

## Storage

In the earlier version of k8s, volume was directly mapped to the containers. This created a very tight coupling between volume & pods.

But now k8s engine has come up with the concept of **Persisted Volumes**. It is defined at the cluster level, so whenever a new pod comes up, it claims the desired store required by it from this Persisted Volume, this is called Persisted Volume Chains.

{% include ad %}
# Kubernetes Cluster
Now that we have seen basic building blocks, lets focus on how the k8s cluster is organized. Each custer comprises of mainly three components.

<img alt="cluster" src="/images/loader.svg" data-src="/images/2019/k8s/k8s-cluster.png" class="lazy img-center"/>

## Master
Only a single master can reside in one cluster. Master is one which co-ordinates cluster operation, monitoring and scheduling. It is the primary data access point, and provides administration of the cluster.

A master is composed of the following components:

<img alt="master" src="/images/loader.svg" data-src="/images/2019/k8s/master.png" class="lazy" width="100%"/>

### Api Server

Api Server is the communication hub of the cluster, it completely stateless, and all the configuration are passed into k8s cluster through api server. Its a simple restful endpoint, whenever it receives the request, it validates and passes the information to _Cluster Store(etcd)_

{% include ad %}
### Cluster Store
As the name suggests, a Cluster Store, persists the values as key-value pair in etcd. Cluster Store also proves watcher on keys for any change in value.

### Scheduler
The Job of scheduler is to select nodes based on prod requirement, suppose a pod requires 4gb ram to run, scheduler will decide on which is the best suited node for it within the multi node cluster.

It also keeps a watch on _Api Server_ for any changes and drives the current state to the desire state. It evaluates the resources available on nodes, and schedules the pod accordingly, we can also provide constraints, that I want two pods to be deployed on same node or different nodes.

### Controller Management
It manages the lifecycle of Controllers, and drives the current state to the desired state. Runs the controller loops (mentioned above), watches and update the api server. It also maintains the replica set.

### kubectl
Although kubectl is not the part of master, but it is the command line tool which talks with the api server (connects to master).

{% include ad %}

## Node

Node is the place where the pods run, its the responsibility of node to monitor pods state as well as application health, the main component that runs on all the nodes are kubelet, kubeproxy, container-runtime & networking.

<img alt="Nodes" src="/images/loader.svg" data-src="/images/2019/k8s/nodes.png" class="lazy" width="100%"/> 

We will take a closer look at the features of each component in detail.

### Kubelet

Kubelet handles the pod lifecycle, reports the node & pods state, monitors api server for any changes and keeps probing the pod for liveliness.

### Kube-proxy
Kube-proxy takes care of the networking, inside a node, a pod can die and new pod is generated in place, somehow the k8s needs to mechanism to connect to these newly connected pods, and direct the traffic to it. This is done by Kube-proxy.

Kube-Proxy maintains an ip-table, mapping of all the ip's of respective pods, when a pod is added or deleted, this ip-table is updated by kube-proxy.

In addition to this kube-proxy is also manages routing and load balancing between the pods. It also listens to api-server in any change to the configuration.

### Container-runtime
This the actual runtime environment, it will download and run the images. By default, k8s support Docker as container, but you can use any container implementation which implements Container Runtime Interface.

{% include ad %}

# Networking

Before we conclude, let see how k8s manages the networking. There are few rules to which k8s adhere:
1. No node should implement Network Address Translation (NAT).
2. All Pods should communicate with all the nodes in cluster.
3. All the nodes should communicate with all the pods in cluster.

K8s uses localhost as hostname to communicate between apps within the same pod.

K8s uses bridge network to communicate between different pods but within same node.

k8s uses IP's to communicate between different nodes within a cluster.

Finally, k8s uses kube-proxy to connect cluster with external service.

# Conclusion

So, till now we have seen basic building blocks for kubernetes, we spent time getting to know main keywords. Next we will be looking at how to install kubernetes.   


 
  




